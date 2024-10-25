import React, { useState } from 'react';
import { Box, Container, Grid, Card, CardContent, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '../utils/IconButton';

const JharkhandInfo = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleInfoOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

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
    <Box sx={{ p: 2, mt: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" gutterBottom align="center">Jharkhand State Agricultural Overview</Typography>
        <IconButton onClick={handleInfoOpen} icon={<InfoIcon />} />
      </Box>
      
      <Grid container spacing={3} justifyContent="center">
        {infoData.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ height: '100%', boxShadow: 2, borderRadius: 2, fontWeight: 'bold' }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold" align="center" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="h6" fontWeight="bold" align="center" sx={{ marginBottom: 1, color: 'gold' }}>
                  {item.value}
                </Typography>
                {item.description && (
                  <Typography variant="body2" align="center" color="text.secondary">
                    {item.description}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog for Info */}
      <Dialog 
        open={dialogOpen} 
        onClose={handleDialogClose} 
        maxWidth="md" 
        fullWidth 
        PaperProps={{
          style: {
            minWidth: '600px', // Adjust as necessary
          },
        }}
      >
        <DialogTitle>Information</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Here you can provide detailed information about Jharkhand's agriculture and related topics.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default JharkhandInfo;