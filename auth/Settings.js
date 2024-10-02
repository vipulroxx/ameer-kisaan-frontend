import React from 'react';
import { Box, Typography, FormControlLabel, Switch, Button } from '@mui/material';

const Settings = () => {
  return (
    <Box sx={{ padding: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 2 }}>
      <Typography variant="h5" gutterBottom>
        Settings
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Adjust your application settings
      </Typography>
      <FormControlLabel
        control={<Switch defaultChecked />}
        label="Enable Notifications"
      />
      <FormControlLabel
        control={<Switch />}
        label="Enable Market Trading"
      />
      <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
        Save Settings
      </Button>
    </Box>
  );
};

export default Settings;
