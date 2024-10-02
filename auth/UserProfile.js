// UserProfile.js
import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const UserProfile = () => {
  return (
    <Box sx={{ padding: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 2 }}>
      <Typography variant="h5">User Profile</Typography>
      <Typography variant="body1">Name: John Doe</Typography>
      <Typography variant="body1">Email: john.doe@example.com</Typography>
      <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
        Edit Profile
      </Button>
    </Box>
  );
};

export default UserProfile;
