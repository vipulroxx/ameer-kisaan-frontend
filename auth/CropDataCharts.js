import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Card, CardContent, Snackbar, Grid } from '@mui/material';
import { Alert } from '@mui/material';
import { Bar } from 'react-chartjs-2';

const HelpDialog = ({ dialogOpen, handleHelpClose, graphDetails }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleNotUnderstood = () => {
    setSnackbarMessage("Contact admin: ameerkissan@ameerkissan.com");
    setSnackbarOpen(true);
  };

  const handleUnderstood = () => {
    setSnackbarMessage("Ok! Great");
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Dialog open={dialogOpen} onClose={handleHelpClose}>
        <DialogTitle>Help</DialogTitle>
        <DialogContent>
          <Card>
            <CardContent>
              <Typography variant="h6">Understanding Crop Graphs</Typography>
              {graphDetails.map((detail, index) => (
                <Typography key={index} variant="body1" paragraph>
                  {detail}
                </Typography>
              ))}
            </CardContent>
          </Card>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNotUnderstood} color="primary">Not Understood</Button>
          <Button onClick={handleUnderstood} color="primary">Understood</Button>
          <Button onClick={handleHelpClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="info" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

const CropDataCharts = ({ data, selectedState, selectedDistricts }) => {
  const [helpDialogOpen, setHelpDialogOpen] = useState(false);
  const [graphDetails, setGraphDetails] = useState([]);

  const handleHelpOpen = () => {
    setGraphDetails(generateGraphDetails());
    setHelpDialogOpen(true);
  };

  const handleHelpClose = () => {
    setHelpDialogOpen(false);
  };

  // Generate explanations based on the data
  const generateGraphDetails = () => {
    return selectedDistricts.map(district => (
      `The graph for ${district} shows three key metrics: Area, Production, and Crop Yield. 
      - **Area**: Represents the land area used for cultivation (in hectares). 
      - **Production**: Indicates the total output of the crop (in tonnes). 
      - **Crop Yield**: This is the efficiency of the crop production, calculated as the ratio of production to area (tonnes per hectare). 
      Hover over the bars to see exact values.`
    ));
  };

  // Filter the data based on the selected state and districts
  const filteredData = data.filter(d => d.state === selectedState && selectedDistricts.includes(d.district));

  const chartData = (districtData) => ({
    labels: ['Area', 'Production', 'Crop Yield'],
    datasets: districtData.map(district => ({
      label: district.district,
      data: [district.area, district.production, district.crop_yield],
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
    })),
  });

  return (
    <Grid container spacing={2} style={{ maxWidth: '1200px', margin: 'auto' }}>
      <Button variant="outlined" color="primary" onClick={handleHelpOpen}>
        Help
      </Button>
      {filteredData.length > 0 ? (
        filteredData.map((districtData) => (
          <Grid item xs={12} sm={6} md={4} key={districtData.district}>
            <Typography variant="h6" align="center">{districtData.district}</Typography>
            <Bar
              data={chartData([districtData])}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: `Crop Data for ${districtData.district}`,
                  },
                },
                tooltips: {
                  enabled: true,
                  mode: 'index',
                  intersect: false,
                },
              }}
            />
          </Grid>
        ))
      ) : (
        <Typography variant="h6" align="center" style={{ width: '100%' }}>
          No data available for the selected state and districts.
        </Typography>
      )}
      
      <HelpDialog dialogOpen={helpDialogOpen} handleHelpClose={handleHelpClose} graphDetails={graphDetails} />
    </Grid>
  );
};

export default CropDataCharts;
