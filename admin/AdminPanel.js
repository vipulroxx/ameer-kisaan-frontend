import React, { useCallback, useEffect, useState } from 'react';
import {
  Box, Typography, Tabs, Tab, TextField, MenuItem, Button, Alert, Card, CardContent, Chip, Grid,
  CircularProgress, Link, Table, TableHead, TableBody, TableRow, TableCell, TableContainer,
} from '@mui/material';
import { adminApi, getCurrentUser } from '../services/api';

const STATUSES = [['open', 'Open'], ['in_review', 'In review'], ['resolved', 'Resolved'], ['rejected', 'Rejected']];
const STATUS_COLOR = { open: 'warning', in_review: 'info', resolved: 'success', rejected: 'default' };
const SEVERITY_COLOR = { critical: 'error', high: 'warning', medium: 'info', low: 'default' };
const label = (s) => s.replace(/_/g, ' ');

// --- Issue reports ------------------------------------------------------------

function ReportCard({ report, onSaved }) {
  const [status, setStatus] = useState(report.status);
  const [note, setNote] = useState(report.adminNote || '');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const changed = status !== report.status || note !== (report.adminNote || '');

  const save = async () => {
    setBusy(true);
    setError(null);
    try {
      onSaved(await adminApi.updateReport(report.ownerId, report.id, { status, adminNote: note.trim() }));
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" gap={1} flexWrap="wrap">
          <Typography variant="subtitle1"><b>{report.crop}</b> · {label(report.category)}</Typography>
          <Box display="flex" gap={0.5}>
            <Chip size="small" label={`${report.severity} severity`} color={SEVERITY_COLOR[report.severity] || 'default'} />
            <Chip size="small" variant="outlined" label={label(report.status)} color={STATUS_COLOR[report.status] || 'default'} />
          </Box>
        </Box>
        <Typography variant="body2" sx={{ my: 1 }}>{report.description}</Typography>
        <Box sx={{ p: 1, my: 1, bgcolor: 'grey.100', borderRadius: 1 }}>
          <Typography variant="body2"><b>Farmer:</b> {report.ownerName || 'Unknown'}</Typography>
          <Typography variant="body2">
            <b>Phone:</b>{' '}
            {report.ownerPhone ? <Link href={`tel:${report.ownerPhone}`}>{report.ownerPhone}</Link> : 'not given'}
          </Typography>
          {report.district && <Typography variant="body2"><b>District:</b> {report.district}</Typography>}
        </Box>
        {report.photoUrls.length > 0 && (
          <Box display="flex" gap={1} flexWrap="wrap" mb={1}>
            {report.photoUrls.map((u) => (
              <a key={u} href={u} target="_blank" rel="noreferrer">
                <img src={u} alt="Reported crop" referrerPolicy="no-referrer"
                  style={{ width: 96, height: 96, objectFit: 'cover', borderRadius: 4 }} />
              </a>
            ))}
          </Box>
        )}
        <Typography variant="caption" color="text.secondary" display="block" mb={1.5}>
          Reported {new Date(report.createdAt).toLocaleString()}
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 1 }}>{error}</Alert>}
        <Grid container spacing={1}>
          <Grid item xs={12} sm={4}>
            <TextField select size="small" label="Status" value={status} onChange={(e) => setStatus(e.target.value)} fullWidth>
              {STATUSES.map(([v, l]) => <MenuItem key={v} value={v}>{l}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField size="small" label="Note to farmer" value={note} onChange={(e) => setNote(e.target.value)}
              fullWidth inputProps={{ maxLength: 1000 }} />
          </Grid>
        </Grid>
        <Button variant="contained" size="small" sx={{ mt: 1 }} disabled={!changed || busy} onClick={save}>
          {busy ? 'Saving...' : 'Save'}
        </Button>
      </CardContent>
    </Card>
  );
}

function ReportQueue() {
  const [status, setStatus] = useState('open');
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    adminApi.reports(status).then(setReports).catch((e) => setError(e.message)).finally(() => setLoading(false));
  }, [status]);

  const saved = (updated) => {
    // A report whose status changed leaves this list; otherwise refresh it in place.
    setReports((prev) => (updated.status === status
      ? prev.map((r) => (r.id === updated.id ? updated : r))
      : prev.filter((r) => r.id !== updated.id)));
    setNotice(`Saved: ${updated.crop} report from ${updated.ownerName || 'farmer'} is now ${label(updated.status)}.`);
  };

  return (
    <Box>
      <Box display="flex" gap={1} flexWrap="wrap" mb={2}>
        {STATUSES.map(([v, l]) => (
          <Chip key={v} label={l} clickable color={status === v ? 'primary' : 'default'}
            variant={status === v ? 'filled' : 'outlined'} onClick={() => setStatus(v)} />
        ))}
      </Box>
      {notice && <Alert severity="success" sx={{ mb: 2 }} onClose={() => setNotice(null)}>{notice}</Alert>}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {loading && <CircularProgress size={24} />}
      {!loading && !error && reports.length === 0 && (
        <Typography color="text.secondary">No {label(status)} reports.</Typography>
      )}
      <Grid container spacing={2}>
        {!loading && reports.map((r) => (
          <Grid item xs={12} md={6} key={r.id}><ReportCard report={r} onSaved={saved} /></Grid>
        ))}
      </Grid>
    </Box>
  );
}

// --- Users --------------------------------------------------------------------

function UserList() {
  const me = getCurrentUser();
  const [users, setUsers] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);
  const [error, setError] = useState(null);

  const load = useCallback(async (from) => {
    setLoading(true);
    setError(null);
    try {
      const page = await adminApi.users(from);
      setUsers((prev) => (from ? [...prev, ...page.items] : page.items));
      setCursor(page.nextCursor);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(null); }, [load]);

  const change = async (u, changes, question) => {
    if (!window.confirm(question)) return;
    setBusyId(u.id);
    setError(null);
    try {
      const updated = await adminApi.updateUser(u.id, changes);
      setUsers((prev) => prev.map((x) => (x.id === updated.id ? updated : x)));
    } catch (e) {
      setError(e.message);
    } finally {
      setBusyId(null);
    }
  };

  return (
    <Box>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((u) => {
              const self = me && u.id === me.id;
              const busy = busyId === u.id;
              return (
                <TableRow key={u.id}>
                  <TableCell>{u.username}{self && ' (you)'}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>{u.phoneNumber ? <Link href={`tel:${u.phoneNumber}`}>{u.phoneNumber}</Link> : '-'}</TableCell>
                  <TableCell>{u.userType}</TableCell>
                  <TableCell>
                    <Chip size="small" label={u.role} color={u.role === 'admin' ? 'primary' : 'default'} />
                  </TableCell>
                  <TableCell>
                    <Chip size="small" label={u.disabled ? 'disabled' : 'active'} color={u.disabled ? 'error' : 'success'}
                      variant="outlined" />
                  </TableCell>
                  <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
                    {!self && (
                      <>
                        <Button size="small" disabled={busy} onClick={() => (u.role === 'admin'
                          ? change(u, { role: 'user' }, `Remove admin rights from ${u.username}?`)
                          : change(u, { role: 'admin' }, `Make ${u.username} an admin? They will be able to see every farmer's reports and phone number.`))}>
                          {u.role === 'admin' ? 'Remove admin' : 'Make admin'}
                        </Button>
                        <Button size="small" color={u.disabled ? 'success' : 'error'} disabled={busy}
                          onClick={() => (u.disabled
                            ? change(u, { disabled: false }, `Enable ${u.username}'s account?`)
                            : change(u, { disabled: true }, `Disable ${u.username}'s account? They will be signed out and unable to log in.`))}>
                          {u.disabled ? 'Enable' : 'Disable'}
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {loading && <CircularProgress size={24} sx={{ mt: 2 }} />}
      {!loading && cursor && <Button sx={{ mt: 2 }} onClick={() => load(cursor)}>Load more</Button>}
      {!loading && !error && users.length === 0 && <Typography color="text.secondary">No users.</Typography>}
    </Box>
  );
}

// --- Panel ----------------------------------------------------------------------

const AdminPanel = () => {
  const [section, setSection] = useState(0);
  return (
    <Box sx={{ p: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 2 }}>
      <Typography variant="h6" gutterBottom>Admin</Typography>
      <Tabs value={section} onChange={(e, i) => setSection(i)} sx={{ mb: 2 }}>
        <Tab label="Issue reports" />
        <Tab label="Users" />
      </Tabs>
      {section === 0 ? <ReportQueue /> : <UserList />}
    </Box>
  );
};

export default AdminPanel;
