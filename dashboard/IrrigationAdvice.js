import React from 'react';
import { Box, Typography } from '@mui/material';

const IrrigationAdvice = ({ soilMoisture, rainfallForecast }) => {
  return (
    <Box>
      <Typography variant="h6">Irrigation Recommendations</Typography>
      {soilMoisture < 30 ? (
        <Typography color="error">Soil moisture is low. Consider irrigating your crops.</Typography>
      ) : (
        <Typography>Soil moisture is adequate. No immediate action required.</Typography>
      )}
      {rainfallForecast && (
        <Typography>Rainfall is expected soon. Adjust irrigation plans accordingly.</Typography>
      )}
    </Box>
  );
};

export default IrrigationAdvice;
