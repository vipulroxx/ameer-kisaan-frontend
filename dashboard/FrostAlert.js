import React from 'react';
import { Box, Typography } from '@mui/material';

const FrostAlert = ({ frostRisk }) => {
  return (
    <Box>
      <Typography variant="h6">Frost and Freeze Alerts</Typography>
      {frostRisk ? (
        <Typography color="error">Warning: Frost risk is high! Take protective measures for your crops.</Typography>
      ) : (
        <Typography>No frost risk detected.</Typography>
      )}
    </Box>
  );
};

export default FrostAlert;
