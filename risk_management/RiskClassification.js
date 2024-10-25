import React, { useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, Button, Dialog } from '@mui/material';
import { FaBug, FaMoneyBillWave, FaToolbox, FaUsers, FaCloudRain, FaGlobeAsia, FaBiohazard, FaTractor, FaGavel, FaTree, FaFire, FaWater } from 'react-icons/fa';
import PestDetection from './PestDetection';

const RiskClassification = () => {
  const [showPestDetection, setShowPestDetection] = useState(false);

  const risks = [
    { name: 'Pest Issues', icon: <FaBug />, learnMore: () => setShowPestDetection(true) },
    { name: 'Economic Issues', icon: <FaMoneyBillWave /> },
    { name: 'Tools Issues', icon: <FaToolbox /> },
    { name: 'Local People Problems', icon: <FaUsers /> },
    { name: 'Weather Problems', icon: <FaCloudRain /> },
    { name: 'Soil Climate Issues', icon: <FaGlobeAsia /> },
    { name: 'Bio Hazard Issues', icon: <FaBiohazard /> },
    { name: 'Vehicle Problems', icon: <FaTractor /> },
    { name: 'Bribery Issues', icon: <FaGavel /> },
    { name: 'Drought Issues', icon: <FaWater /> },
    { name: 'Wildfire Risks', icon: <FaFire /> },
    { name: 'Forest Management Issues', icon: <FaTree /> },
  ];

  return (
    <Box>
      <Typography variant="h6" mb={2}>Risk Classification</Typography>
      <Grid container spacing={2}>
        {risks.map((risk, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" align="center">
                  {risk.icon} {risk.name}
                </Typography>
                <Button variant="contained" fullWidth sx={{ mt: 1 }} onClick={risk.learnMore}>
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      <Dialog open={showPestDetection} onClose={() => setShowPestDetection(false)}>
        <PestDetection onClose={() => setShowPestDetection(false)} />
      </Dialog>
    </Box>
  );
};

export default RiskClassification;
