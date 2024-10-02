// HelpSupport.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const HelpSupport = () => {
  return (
    <Box sx={{ padding: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 2 }}>
      <Typography variant="h5">Help & Support</Typography>
      <Typography variant="body1">For any assistance, please contact our support team at:</Typography>
      <Typography variant="body1" color="primary">support@example.com</Typography>
    </Box>
  );
};

export default HelpSupport;
