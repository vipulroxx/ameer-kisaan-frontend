import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  CardMedia,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '../utils/IconButton';
import { makeStyles } from '@mui/styles';
import img from '../auth/Jharkhand.png';
import img2 from '../auth/cropbanner.png';
import img3 from '../auth/farmer.png';
import { blue } from '@mui/material/colors';

const useStyles = makeStyles((theme) => ({
  card: {},
  media: {
    width: '100%',
    objectFit: 'contain',
  },
}));

const JharkhandInfo = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const classes = useStyles();

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

      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          style: {},
        }}
      >
        <DialogTitle align="center">Jharkhand Agriculture Information</DialogTitle>
        <DialogContent sx={{ padding: 2, backgroundColor: '#f0f0f0' }}>
          <Card sx={{ mb: 2, mt: 2, padding: 2 }}>
            <CardMedia
              component="img"
              image={img}
              alt="Jharkhand Map"
              sx={{
                width: '100%',
                height: '200px',
                objectFit: 'contain',
              }}
            />
          </Card>
          <Grid container spacing={2}>
            {infoData.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  className={classes.card}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 2,
                    margin: '8px',
                    textAlign: 'center',
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', padding: 1 }}>
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{
                        fontWeight: 'bold',
                        marginBottom: 1,
                        color: blue[500],
                      }}
                      align="center"
                    >
                      {item.title}
                    </Typography>
                    <Typography variant="body2">
                      {item.value}
                    </Typography>
                    {item.description && (
                      <Typography variant="body2">
                        {item.description}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default JharkhandInfo;
