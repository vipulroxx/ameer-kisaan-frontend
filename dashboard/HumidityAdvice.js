import React from 'react';
import { Box, Typography } from '@mui/material';

const HumidityAdvice = ({ currentHumidity }) => {
  return (
    <Box>
      <Typography variant="h6">Humidity Insights</Typography>
      {currentHumidity > 80 ? (
        <Typography color="error">Warning: High humidity levels can lead to fungal diseases. Monitor crops closely.</Typography>
      ) : (
        <Typography>Humidity levels are normal.</Typography>
      )}
    </Box>
  );
};

export default HumidityAdvice;
