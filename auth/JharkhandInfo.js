import React from 'react';
import { Box, Grid, Card, CardContent, Typography } from '@mui/material';

const JharkhandInfo = () => {
  const infoData = [
    { title: 'Total Area', value: '79.71 lakh ha', description: '47.67% under cultivation, 29.20% under forest cover.' },
    { title: 'Average Rainfall', value: '130 cm', description: '(almost double India’s average).' },
    { title: 'Major Crops', value: 'Paddy, Coarse Grains, Maize, Wheat, Pulses, Oilseeds' },
    { title: 'Abundant Fruits', value: 'Mango, Banana, Guava, Papaya, Tomato, Chili, Spices' },
    { title: 'Agricultural Growth Rate', value: '13%' },
    { title: 'Milk Production', value: '18 Lakh MT', description: '(17% increase between 2014-17)' },
    { title: 'Egg Production', value: '48 Crore', description: '(8% increase FY15-17)' },
  ];

  return (
    <Box sx={{ p: 2 , mt: 3 }}>
      <Typography variant="h4" gutterBottom align="center">Jharkhand State Agricultural Overview</Typography>
      <Grid container spacing={3} justifyContent="center">
        {infoData.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ height: '100%', boxShadow: 2, borderRadius: 2, fontWeight: 'bold'}}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {item.title}
                </Typography>
                <Typography variant="h6" fontWeight="bold" align="center" sx={{ marginBottom: 1, color: 'gold'}}>
                  {item.value}
                </Typography>
                {item.description && (
                  <Typography variant="body2" align="center" color="text.secondary" >
                    {item.description}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default JharkhandInfo;
