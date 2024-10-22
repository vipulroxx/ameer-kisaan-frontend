import React from 'react';
import { Box, Typography } from '@mui/material';

const HeatStressAdvice = ({ currentTemp }) => {
  return (
    <Box>
      <Typography variant="h6">Heat Stress Management</Typography>
      {currentTemp > 30 ? (
        <Typography color="error">Warning: Current temperature is high. Ensure crops are adequately hydrated.</Typography>
      ) : (
        <Typography>Temperature is manageable. Monitor closely.</Typography>
      )}
    </Box>
  );
};

export default HeatStressAdvice;
