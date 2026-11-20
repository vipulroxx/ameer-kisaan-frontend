// Ameer Kisaan API client.
//
// Security model:
//  * The short-lived access token lives only in memory (never localStorage),
//    so injected scripts or other browser profiles cannot lift it from storage.
//  * The refresh token is an HttpOnly, SameSite=Strict cookie set by the API;
//    JavaScript cannot read it at all. It is rotated on every use.
//  * Every cookie-authenticated call sends X-Requested-With, which the API
//    requires as CSRF protection.

const BASE = process.env.REACT_APP_API_BASE || '/api/v1';
const CSRF_HEADER = { 'X-Requested-With': 'ameer-kisaan' };

let accessToken = null;
let currentUser = null;
let refreshInFlight = null;
const listeners = new Set();

export class ApiError extends Error {
  constructor(message, status, details) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

export function onSessionChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function getCurrentUser() {
  return currentUser;
}

function setSession(token, user) {
  accessToken = token;
  currentUser = user || null;
  listeners.forEach((fn) => fn(user || null));
}

async function parse(res) {
  if (res.status === 204) return null;
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    let message = typeof data.detail === 'string' ? data.detail : 'Request failed.';
    if (Array.isArray(data.errors) && data.errors.length) {
      message = data.errors.map((e) => `${e.field || 'input'}: ${e.message}`).join('; ');
    }
    throw new ApiError(message, res.status, data);
  }
  return data;
}

async function refreshSession() {
  if (!refreshInFlight) {
    refreshInFlight = fetch(`${BASE}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
      headers: CSRF_HEADER,
    })
      .then(parse)
      .then((data) => {
        setSession(data.accessToken, data.user);
        return data;
      })
      .catch((err) => {
        setSession(null, null);
        throw err;
      })
      .finally(() => {
        refreshInFlight = null;
      });
  }
  return refreshInFlight;
}

async function request(path, { method = 'GET', json, form, auth = true, retry = true } = {}) {
  const headers = { ...CSRF_HEADER };
  if (auth && accessToken) headers.Authorization = `Bearer ${accessToken}`;
  let body;
  if (json !== undefined) {
    headers['Content-Type'] = 'application/json';
    body = JSON.stringify(json);
  } else if (form) {
    body = form; // browser sets the multipart boundary
  }
  const res = await fetch(`${BASE}${path}`, { method, headers, body, credentials: 'include' });
  if (res.status === 401 && auth && retry) {
    try {
      await refreshSession();
    } catch {
      throw new ApiError('Your session has expired. Please log in again.', 401);
    }
    return request(path, { method, json, form, auth, retry: false });
  }
  return parse(res);
}

// --- Auth -------------------------------------------------------------------
export const authApi = {
  async register(user) {
    return request('/auth/register', { method: 'POST', json: user, auth: false });
  },
  async login(email, password) {
    const data = await request('/auth/login', { method: 'POST', json: { email, password }, auth: false });
    setSession(data.accessToken, data.user);
    return data.user;
  },
  // Called on page load: silently resumes a session from the HttpOnly cookie.
  async restore() {
    try {
      const data = await refreshSession();
      return data.user;
    } catch {
      return null;
    }
  },
  async logout() {
    try {
      await request('/auth/logout', { method: 'POST', auth: false });
    } finally {
      setSession(null, null);
    }
  },
  me: () => request('/users/me'),
  updateMe: (changes) => request('/users/me', { method: 'PATCH', json: changes }),
  async changePassword(currentPassword, newPassword) {
    const data = await request('/users/me/password', { method: 'POST', json: { currentPassword, newPassword } });
    setSession(data.accessToken, data.user);
    return data.user;
  },
};

// --- Data -------------------------------------------------------------------
export const inventoryApi = {
  list: () => request('/inventory'),
  create: (item) => request('/inventory', { method: 'POST', json: item }),
  update: (id, item) => request(`/inventory/${encodeURIComponent(id)}`, { method: 'PUT', json: item }),
  remove: (id) => request(`/inventory/${encodeURIComponent(id)}`, { method: 'DELETE' }),
};

export const forumApi = {
  list: (cursor) => request(`/forum/posts?limit=20${cursor ? `&cursor=${encodeURIComponent(cursor)}` : ''}`),
  create: (text) => request('/forum/posts', { method: 'POST', json: { text } }),
  edit: (id, text) => request(`/forum/posts/${encodeURIComponent(id)}`, { method: 'PUT', json: { text } }),
  remove: (id) => request(`/forum/posts/${encodeURIComponent(id)}`, { method: 'DELETE' }),
  reply: (id, text) => request(`/forum/posts/${encodeURIComponent(id)}/replies`, { method: 'POST', json: { text } }),
  like: (id) => request(`/forum/posts/${encodeURIComponent(id)}/like`, { method: 'POST' }),
  unlike: (id) => request(`/forum/posts/${encodeURIComponent(id)}/like`, { method: 'DELETE' }),
};

export const reportsApi = {
  mine: () => request('/reports'),
  create: ({ crop, category, severity, description, district, photos }) => {
    const form = new FormData();
    form.append('crop', crop);
    form.append('category', category);
    form.append('severity', severity);
    form.append('description', description);
    if (district) form.append('district', district);
    (photos || []).forEach((p) => form.append('photos', p));
    return request('/reports', { method: 'POST', form });
  },
};

export const assistantApi = {
  ask: (question, language = 'en') => request('/assistant/ask', { method: 'POST', json: { question, language } }),
  history: () => request('/assistant/history'),
};

export const visionApi = {
  identifyCrop: (file) => {
    const form = new FormData();
    form.append('photo', file);
    return request('/vision/identify-crop', { method: 'POST', form });
  },
};
