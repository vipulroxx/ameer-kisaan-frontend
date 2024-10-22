import React from 'react';
import { Box, Typography } from '@mui/material';

const CropTips = () => {
  const tips = [
    "Water your crops early in the morning to reduce evaporation.",
    "Rotate your crops each season to improve soil health.",
    "Use organic fertilizers to enhance crop growth.",
    "Monitor for pests regularly to prevent infestations.",
  ];

  return (
    <Box sx={{ padding: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 2 }}>
      <Typography variant="h5">Crop Cultivation Tips</Typography>
      {tips.map((tip, index) => (
        <Typography key={index} variant="body1" sx={{ marginBottom: 1 }}>
          - {tip}
        </Typography>
      ))}
    </Box>
  );
};

export default CropTips;
