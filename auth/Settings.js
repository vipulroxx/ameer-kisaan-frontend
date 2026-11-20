import React, { useState } from 'react';
import { Box, Typography, FormControlLabel, Switch, Button, TextField, Alert, Divider } from '@mui/material';
import { authApi } from '../services/api';

const Settings = () => {
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [status, setStatus] = useState(null);
  const [busy, setBusy] = useState(false);

  const changePassword = async (e) => {
    e.preventDefault();
    if (next !== confirm) {
      setStatus({ type: 'error', text: 'New passwords do not match.' });
      return;
    }
    setBusy(true);
    try {
      await authApi.changePassword(current, next);
      setStatus({ type: 'success', text: 'Password changed. You have been signed out on all other devices.' });
      setCurrent(''); setNext(''); setConfirm('');
    } catch (err) {
      setStatus({ type: 'error', text: err.message });
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 2 }}>
      <Typography variant="h5" gutterBottom>Settings</Typography>
      <Typography variant="subtitle1" gutterBottom>Adjust your application settings</Typography>
      <FormControlLabel control={<Switch defaultChecked />} label="Enable Notifications" />
      <FormControlLabel control={<Switch />} label="Enable Market Trading" />

      <Divider sx={{ my: 3 }} />
      <Typography variant="h6" gutterBottom>Change password</Typography>
      <Box component="form" onSubmit={changePassword} sx={{ maxWidth: 420 }}>
        {status && <Alert severity={status.type} sx={{ mb: 2 }}>{status.text}</Alert>}
        <TextField label="Current password" type="password" autoComplete="current-password" fullWidth margin="dense"
          value={current} onChange={(e) => setCurrent(e.target.value)} required />
        <TextField label="New password" type="password" autoComplete="new-password" fullWidth margin="dense"
          helperText="At least 10 characters, with letters and numbers."
          value={next} onChange={(e) => setNext(e.target.value)} required />
        <TextField label="Confirm new password" type="password" autoComplete="new-password" fullWidth margin="dense"
          value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
        <Button type="submit" variant="contained" sx={{ mt: 2 }} disabled={busy}>
          {busy ? 'Saving...' : 'Change password'}
        </Button>
      </Box>
    </Box>
  );
};

export default Settings;
