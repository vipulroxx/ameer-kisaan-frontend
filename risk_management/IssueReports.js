import React, { useEffect, useState } from 'react';
import {
  Box, Typography, TextField, MenuItem, Button, Alert, Card, CardContent, Chip, Grid, CircularProgress,
} from '@mui/material';
import { reportsApi } from '../services/api';

const CATEGORIES = [
  ['pest', 'Pest'], ['disease', 'Disease'], ['weather', 'Weather'], ['soil_climate', 'Soil & climate'],
  ['economic', 'Economic'], ['tools', 'Tools & machinery'], ['transport', 'Transport'],
  ['natural_calamity', 'Natural calamity'], ['wildfire', 'Wildfire'], ['forest', 'Forest management'],
  ['biohazard', 'Biohazard'], ['local_people', 'Local people'], ['bribery', 'Bribery'], ['other', 'Other'],
];
const STATUS_COLOR = { open: 'warning', in_review: 'info', resolved: 'success', rejected: 'default' };
const MAX_PHOTOS = 4;
const MAX_MB = 5;
const empty = { crop: '', category: 'pest', severity: 'medium', description: '', district: '' };

const IssueReports = () => {
  const [form, setForm] = useState(empty);
  const [photos, setPhotos] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    reportsApi.mine().then(setReports).catch((e) => setMessage({ type: 'error', text: e.message }))
      .finally(() => setLoading(false));
  }, []);

  const pickPhotos = (e) => {
    const files = Array.from(e.target.files || []);
    const tooBig = files.find((f) => f.size > MAX_MB * 1024 * 1024);
    if (files.length > MAX_PHOTOS) {
      setMessage({ type: 'error', text: `Choose at most ${MAX_PHOTOS} photos.` });
    } else if (tooBig) {
      setMessage({ type: 'error', text: `${tooBig.name} is larger than ${MAX_MB} MB.` });
    } else {
      setPhotos(files);
      setMessage(null);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const created = await reportsApi.create({ ...form, photos });
      setReports((prev) => [created, ...prev]);
      setForm(empty);
      setPhotos([]);
      e.target.reset();
      setMessage({ type: 'success', text: 'Report submitted. An agriculture officer will review it.' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setBusy(false);
    }
  };

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <Box sx={{ p: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 2 }}>
      <Typography variant="h6" gutterBottom>Report a crop issue</Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Photos are checked, stripped of location data and stored privately. Only you and agriculture officers can see them.
      </Typography>
      {message && <Alert severity={message.type} sx={{ my: 2 }} onClose={() => setMessage(null)}>{message.text}</Alert>}
      <Box component="form" onSubmit={submit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField label="Crop" value={form.crop} onChange={set('crop')} required fullWidth inputProps={{ maxLength: 60 }} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField select label="Category" value={form.category} onChange={set('category')} fullWidth>
              {CATEGORIES.map(([v, l]) => <MenuItem key={v} value={v}>{l}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField select label="Severity" value={form.severity} onChange={set('severity')} fullWidth>
              {['low', 'medium', 'high', 'critical'].map((v) => <MenuItem key={v} value={v}>{v}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField label="What is happening?" value={form.description} onChange={set('description')} required
              fullWidth multiline minRows={2} inputProps={{ minLength: 5, maxLength: 2000 }} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="District (optional)" value={form.district} onChange={set('district')} fullWidth
              inputProps={{ maxLength: 60 }} />
          </Grid>
          <Grid item xs={12}>
            <Button variant="outlined" component="label">
              Add photos ({photos.length}/{MAX_PHOTOS})
              <input hidden type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={pickPhotos} />
            </Button>
            <Button type="submit" variant="contained" sx={{ ml: 2 }} disabled={busy}>
              {busy ? 'Submitting...' : 'Submit report'}
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Typography variant="h6" sx={{ mt: 4 }} gutterBottom>My reports</Typography>
      {loading && <CircularProgress size={24} />}
      {!loading && reports.length === 0 && <Typography color="text.secondary">No reports yet.</Typography>}
      <Grid container spacing={2}>
        {reports.map((r) => (
          <Grid item xs={12} md={6} key={r.id}>
            <Card variant="outlined">
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="subtitle1"><b>{r.crop}</b> · {r.category.replace('_', ' ')} · {r.severity}</Typography>
                  <Chip size="small" label={r.status.replace('_', ' ')} color={STATUS_COLOR[r.status] || 'default'} />
                </Box>
                <Typography variant="body2" sx={{ my: 1 }}>{r.description}</Typography>
                {r.adminNote && <Alert severity="info" sx={{ my: 1 }}>Officer: {r.adminNote}</Alert>}
                <Box display="flex" gap={1} flexWrap="wrap">
                  {r.photoUrls.map((u) => (
                    <img key={u} src={u} alt="Reported crop" referrerPolicy="no-referrer"
                      style={{ width: 96, height: 96, objectFit: 'cover', borderRadius: 4 }} />
                  ))}
                </Box>
                <Typography variant="caption" color="text.secondary">{new Date(r.createdAt).toLocaleString()}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default IssueReports;
