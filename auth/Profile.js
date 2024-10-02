import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

const Profile = () => {
  return (
    <Box sx={{ padding: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 2 }}>
      <Typography variant="h5" gutterBottom>
        User Profile
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Update your profile information
      </Typography>
      <TextField
        fullWidth
        label="Full Name"
        margin="normal"
        variant="outlined"
      />
      <TextField
        fullWidth
        label="Email"
        margin="normal"
        variant="outlined"
      />
      <TextField
        fullWidth
        label="Phone Number"
        margin="normal"
        variant="outlined"
      />
      <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
        Save Changes
      </Button>
    </Box>
  );
};

export default Profile;
