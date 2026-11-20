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
  DialogActions,
  Button,
  CardMedia,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '../utils/IconButton';
import { makeStyles } from '@mui/styles';
import img from '../auth/Jharkhand.png'; // Ensure this path is correct
import img2 from '../auth/cropbanner.png'; // Replace with actual image path
import img3 from '../auth/farmer.png';

const useStyles = makeStyles((theme) => ({
  card: {
    margin: theme.spacing(2),
    width: '100%', // Ensure cards take full width
  },
  media: {
    height: 400,
    width: '100%', // Ensure it takes full width
    objectFit: 'contain', // Ensure the entire image is visible
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

  const topics = [
    {
      title: 'Jharkhand',
      image: img,
      content: (
        <>
          <Typography variant="body1">
            The cultivated area of the state is about 1.8 million ha, comprising 22% of the geographical area. The net irrigated area is about 0.16 million ha, constituting 9.3% of the cultivated area. Major constraints include sloping lands, soil erosion, and water scarcity.
          </Typography>
          <Typography variant="body1" paragraph>
            The agricultural economy of Jharkhand is characterized by dependence on nature, low investment, low productivity, and mono-cropping, with paddy as the dominant crop. As much as 92% of the total cultivated area is unirrigated. The cultivable land has good potential for higher production of horticulture and forest products.
          </Typography>
          <Typography variant="h6">Suggested Interventions</Typography>
          <ul>
            <li>Water harvesting in ponds.</li>
            <li>Amelioration of degraded soils.</li>
            <li>Introduction of new crops.</li>
          </ul>
        </>
      ),
    },
    {
      title: 'Crops Overview',
      image: img2, // Replace with actual image path
      content: (
        <>
          <Typography variant="h6">Rice</Typography>
          <Typography variant="body1">
            The state has 1.4 million ha under rice cultivation, mainly in rainfed areas. Major constraints include drought and low soil fertility.
          </Typography>
          <Typography variant="h6">Major Interventions</Typography>
          <ul>
            <li>Drought-tolerant varieties.</li>
            <li>Integrated weed management.</li>
          </ul>
          <Typography variant="h6">Pigeonpea</Typography>
          <Typography variant="body1">
            Pigeonpea occupies about 85,000 ha with a production of 54,000 tonnes. Major constraints include mid-season drought and pest infestations.
          </Typography>
          <Typography variant="h6">Suitable Interventions</Typography>
          <ul>
            <li>Improved seed varieties.</li>
            <li>Soil and water conservation.</li>
          </ul>
          <Typography variant="h6">Water Resource Management</Typography>
          <Typography variant="body1" paragraph>
            Presently, the availability of water resources is 287810 lakh m³, with 237890 lakh m³ from surface water and 49920 lakh m³ from groundwater. The total utilization for irrigation is only 47360 lakh m³.
          </Typography>
        </>
      ),
    },
    {
      title: 'Mission',
      image: img3,
      content: (
        <>
          <Typography variant="body1" paragraph>
            Jharkhand State is endowed with vast and rich natural resources, mainly minerals and forests, with 80% of its population residing in 32620 villages relying on agriculture and allied activities for their livelihood.
          </Typography>
          <Typography variant="body1" paragraph>
            One of the main strategies for development is ensuring sustainable agricultural and rural development. Capacity building is focal for developmental endeavors.
          </Typography>
          <Typography variant="body1" paragraph>
            There is scope for increasing production and productivity of food crops through optimal utilization of inputs. Horticultural development holds vast potential not only for local consumption but also for exports. Livestock enterprises present opportunities for increasing milk, meat, and egg production, along with establishing food processing units.
          </Typography>
        </>
      ),
    },
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
          
          <Grid container spacing={2}>
            {topics.map((topic, index) => (
              <Grid item xs={12} key={index}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.media}
                    image={topic.image}
                    title={topic.title}
                  />
                  <CardContent>
                    <Typography variant="h6">{topic.title}</Typography>
                    {topic.content}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default JharkhandInfo;
