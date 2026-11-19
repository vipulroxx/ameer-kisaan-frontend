import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Card,
  CardContent,
  Snackbar,
  Grid,
  Alert,
  Slide,
  IconButton,
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
  Input,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { AcUnit } from '@mui/icons-material'; // Example icon for soil types
import SoilPopup from '../dashboard/SoilPopup'; // Import SoilPopup

Chart.register(...registerables);

const HelpDialog = ({ dialogOpen, handleHelpClose, graphDetails }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleNotUnderstood = () => {
    setSnackbarMessage('Contact admin: ameerkissan@ameerkissan.com');
    setSnackbarOpen(true);
  };

  const handleUnderstood = () => {
    setSnackbarMessage('Ok! Great');
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Dialog
      open={dialogOpen}
      onClose={handleHelpClose}
      TransitionComponent={Slide}
      TransitionProps={{ direction: 'up' }}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Understanding Crop Graphs</Typography>
          <IconButton edge="end" color="inherit" onClick={handleHelpClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <Card>
          <CardContent>
            {graphDetails.map((detail, index) => (
              <Typography key={index} variant="body1" paragraph>
                {detail}
              </Typography>
            ))}
          </CardContent>
        </Card>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleNotUnderstood} color="primary">
          Not Understood
        </Button>
        <Button onClick={handleUnderstood} color="primary">
          Understood
        </Button>
      </DialogActions>
      <Snackbar open={snackbarOpen} autoHideDuration={2000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={handleSnackbarClose} severity="info" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

const CropDataCharts = ({ data }) => {
  const [helpDialogOpen, setHelpDialogOpen] = useState(false);
  const [graphDetails, setGraphDetails] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const [availableDistricts, setAvailableDistricts] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [tabValue, setTabValue] = useState(0); // 0: Data Analysis, 1: Recommendation
  const [soilMapOpen, setSoilMapOpen] = useState(false); // State for SoilPopup

  // Recommendation Form State
  const [soilType, setSoilType] = useState('');
  const [climateData, setClimateData] = useState('');
  const [resources, setResources] = useState('');
  const [marketDemand, setMarketDemand] = useState('');
  const [farmerPreference, setFarmerPreference] = useState('');
  const [image, setImage] = useState(null);
  const [recommendationFormSubmitted, setRecommendationFormSubmitted] = useState(false);

  useEffect(() => {
    if (selectedState) {
      const districts = [...new Set(data.filter((d) => d.state === selectedState).map((d) => d.district))];
      setAvailableDistricts(districts);
    } else {
      setAvailableDistricts([]);
      setSelectedDistricts([]);
    }
  }, [selectedState, data]);

  const handleHelpOpen = () => {
    setGraphDetails(generateGraphDetails());
    setHelpDialogOpen(true);
  };

  const handleHelpClose = () => {
    setHelpDialogOpen(false);
  };

  const generateGraphDetails = () => {
    return selectedDistricts.map(
      (district) =>
        `The graph for ${district} shows three key metrics: Area, Production, and Crop Yield.
      - **Area**: Represents the land area used for cultivation (in hectares).
      - **Production**: Indicates the total output of the crop (in tonnes).
      - **Crop Yield**: This is the efficiency of the crop production, calculated as the ratio of production to area (tonnes per hectare).
      Hover over the bars to see exact values.`
    );
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
    setSelectedDistricts([]); // Clear selected districts when state changes
  };

  const handleDistrictChange = (event) => {
    setSelectedDistricts(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if (!selectedState || selectedDistricts.length === 0) {
      // Basic validation: check if state and at least one district are selected
      return;
    }

    setFormSubmitted(false);
  };

  const filteredData = data.filter(
    (d) => d.state === selectedState && selectedDistricts.includes(d.district)
  );

  const chartData = (districtData) => ({
    labels: ['Area', 'Production', 'Crop Yield'],
    datasets: districtData.map((district) => ({
      label: district.district,
      data: [district.area, district.production, district.crop_yield],
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
    })),
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleRecommendationSubmit = (event) => {
    event.preventDefault();
    setRecommendationFormSubmitted(true);

    if (!soilType || !climateData || !resources || !marketDemand || !farmerPreference || !image) {
      return;
    }

    // Handle recommendation form submission logic here
    console.log('Recommendation Form Submitted:', {
      soilType,
      climateData,
      resources,
      marketDemand,
      farmerPreference,
      image,
    });

    setRecommendationFormSubmitted(false);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSoilMapClose = () => {
    setSoilMapOpen(false);
  };

  return (
    <Grid container spacing={2} style={{ maxWidth: '1200px', margin: 'auto' }}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="Crop Analysis Tabs">
              <Tab label="Crop Data Analysis" />
              <Tab label="Crop Recommendation" /> 
            </Tabs>

            {tabValue === 0 && (
              <Box mt={2}>
                <Typography variant="h5" gutterBottom>
                  Select State and Districts
                </Typography>
                <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '16px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                  <FormControl required>
                    <InputLabel id="state-select-label">State</InputLabel>
                    <Select
                      labelId="state-select-label"
                      id="state-select"
                      value={selectedState}
                      label="State"
                      onChange={handleStateChange}
                      style={{ minWidth: '120px' }}
                    >
                      {[...new Set(data.map((d) => d.state))].map((state) => (
                        <MenuItem key={state} value={state}>
                          {state}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl required disabled={!selectedState}>
                    <InputLabel id="district-select-label">Districts</InputLabel>
                    <Select
                      labelId="district-select-label"
                      id="district-select"
                      multiple
                      value={selectedDistricts}
                      onChange={handleDistrictChange}
                      label="Districts"
                      style={{ minWidth: '160px' }}
                      renderValue={(selected) => selected.join(', ')}
                    >
                      {availableDistricts.map((district) => (
                        <MenuItem key={district} value={district}>
                          {district}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <Button variant="contained" color="primary" type="submit">
                    Show Data
                  </Button>
                  <Button variant="outlined" color="secondary" startIcon={<AcUnit />} onClick={() => setSoilMapOpen(true)}>
                    Show Soil Types
                  </Button>
                  <Button variant="outlined" color="primary" onClick={handleHelpOpen} style={{ marginLeft: '16px' }}>
                    Help
                  </Button>
                </form>
                {formSubmitted && (!selectedState || selectedDistricts.length === 0) && (
                  <Typography color="error">Please select a state and at least one district.</Typography>
                )}
              </Box>
            )}

            {/*{tabValue === 1 && (
              <Box mt={2}>
                <Typography variant="h5" gutterBottom>
                  Crop Recommendation Form
                </Typography>
                <form onSubmit={handleRecommendationSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <TextField
                    label="Soil Type"
                    required
                    value={soilType}
                    onChange={(e) => setSoilType(e.target.value)}
                  />
                  <TextField
                    label="Climate Data"
                    required
                    value={climateData}
                    onChange={(e) => setClimateData(e.target.value)}
                  />
                  <TextField
                    label="Available Resources"
                    required
                    value={resources}
                    onChange={(e) => setResources(e.target.value)}
                  />
                  <TextField
                    label="Market Demand"
                    required
                    value={marketDemand}
                    onChange={(e) => setMarketDemand(e.target.value)}
                  />
                  <TextField
                    label="Farmer Preference"
                    required
                    value={farmerPreference}
                    onChange={(e) => setFarmerPreference(e.target.value)}
                  />
                  <FormControl required>
                    <InputLabel htmlFor="image-upload">Upload Image</InputLabel>
                    <Input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </FormControl>

                  <Button variant="contained" color="primary" type="submit">
                    Get Recommendation
                  </Button>
                  {recommendationFormSubmitted &&
                    (!soilType || !climateData || !resources || !marketDemand || !farmerPreference || !image) && (
                      <Typography color="error">Please fill in all required fields.</Typography>
                    )}
                </form>
              </Box>
            )}*/}
          </CardContent>
        </Card>
      </Grid>

      {filteredData.length > 0 && tabValue === 0 ? (
        filteredData.map((districtData) => (
          <Grid item xs={12} sm={6} md={4} key={districtData.district}>
            <Typography variant="h6" align="center">
              {districtData.district}
            </Typography>
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
        tabValue === 0 && (
          <Grid item xs={12}>
            <Typography variant="h6" align="center" style={{ width: '100%' }}>
              {formSubmitted
                ? 'No data available for the selected state and districts.'
                : 'Please select a state and district to view data.'}
            </Typography>
          </Grid>
        )
      )}

      <SoilPopup isOpen={soilMapOpen} onClose={handleSoilMapClose} /> {/* Render SoilPopup */}

      <HelpDialog dialogOpen={helpDialogOpen} handleHelpClose={handleHelpClose} graphDetails={graphDetails} />
    </Grid>
  );
};

export default CropDataCharts;
