import React from 'react';
import { Box, Typography } from '@mui/material';

const RainfallAdvice = ({ expectedRain }) => {
  return (
    <Box>
      <Typography variant="h6">Rainfall Predictions and Tips</Typography>
      {expectedRain > 0 ? (
        <Typography>Expecting {expectedRain} mm of rain. Prepare for potential flooding.</Typography>
      ) : (
        <Typography>No significant rainfall expected in the coming days.</Typography>
      )}
    </Box>
  );
};

export default RainfallAdvice;
