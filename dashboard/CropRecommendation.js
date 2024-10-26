import React, { useState } from 'react';
import {
  Button,
  Container,
  Typography,
  Grid,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Tooltip,
  FormControlLabel,
  Checkbox,
  Grid2,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/CloudUpload';
import QrCodeIcon from '@mui/icons-material/QrCode';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import HelpIcon from '@mui/icons-material/Help';
import CropDataCharts from '../auth/CropDataCharts';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip as ChartTooltip, Legend } from 'chart.js';
import SoilPopup from './SoilPopup';
import JharkhandInfo from '../auth/JharkhandInfo';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ChartTooltip, Legend);

const cropData = [
  {
    id: "crop_001",
    fiscal_year: "2019-20",
    state: "Jharkhand",
    district: "Ranchi",
    sub_district: "Ranchi",
    season: "Rabi",
    crop: "Masoor",
    crop_variety: "Local",
    area: 2755,
    production: 2204,
    crop_yield: 0.8,
    unit: "area in Hectare, production in Tonne, crop_yield in Tonne per Hectare",
    previous_years: [{ year: "2018-19", production: 2100, area: 2700 }],
    description: "Masoor is a major pulse crop, rich in protein.",
    note: ""
  },
  {
    id: "crop_002",
    fiscal_year: "2019-20",
    state: "Jharkhand",
    district: "East Singhbhum",
    sub_district: "Jamshedpur",
    season: "Kharif",
    crop: "Maize",
    crop_variety: "Hybrid",
    area: 5000,
    production: 12500,
    crop_yield: 2.5,
    unit: "area in Hectare, production in Tonne, crop_yield in Tonne per Hectare",
    previous_years: [{ year: "2018-19", production: 12000, area: 4900 }],
    description: "Maize is used for both food and fodder.",
    note: ""
  },
  {
    id: "crop_003",
    fiscal_year: "2019-20",
    state: "Jharkhand",
    district: "Hazaribagh",
    sub_district: "Hazaribagh",
    season: "Rabi",
    crop: "Wheat",
    crop_variety: "Durum",
    area: 3000,
    production: 9000,
    crop_yield: 3.0,
    unit: "area in Hectare, production in Tonne, crop_yield in Tonne per Hectare",
    previous_years: [{ year: "2018-19", production: 8500, area: 2900 }],
    description: "Wheat is a staple food grain, important for food security.",
    note: ""
  },
  {
    id: "crop_004",
    fiscal_year: "2019-20",
    state: "Jharkhand",
    district: "Dhanbad",
    sub_district: "Dhanbad",
    season: "Kharif",
    crop: "Paddy",
    crop_variety: "IR64",
    area: 4000,
    production: 8000,
    crop_yield: 2.0,
    unit: "area in Hectare, production in Tonne, crop_yield in Tonne per Hectare",
    previous_years: [{ year: "2018-19", production: 7800, area: 3900 }],
    description: "Paddy is a major staple food crop in India.",
    note: ""
  },
  {
    id: "crop_005",
    fiscal_year: "2019-20",
    state: "Jharkhand",
    district: "Bokaro",
    sub_district: "Bokaro",
    season: "Rabi",
    crop: "Barley",
    crop_variety: "Local",
    area: 1500,
    production: 2000,
    crop_yield: 1.33,
    unit: "area in Hectare, production in Tonne, crop_yield in Tonne per Hectare",
    previous_years: [{ year: "2018-19", production: 1900, area: 1450 }],
    description: "Barley is used for food, fodder, and brewing.",
    note: ""
  },
  {
    id: "crop_006",
    fiscal_year: "2019-20",
    state: "Jharkhand",
    district: "Dumka",
    sub_district: "Dumka",
    season: "Kharif",
    crop: "Pulses",
    crop_variety: "Moong",
    area: 2000,
    production: 1500,
    crop_yield: 0.75,
    unit: "area in Hectare, production in Tonne, crop_yield in Tonne per Hectare",
    previous_years: [{ year: "2018-19", production: 1400, area: 1900 }],
    description: "Moong is a type of pulse, high in protein.",
    note: ""
  },
  {
    id: "crop_007",
    fiscal_year: "2019-20",
    state: "Jharkhand",
    district: "Palamu",
    sub_district: "Daltonganj",
    season: "Kharif",
    crop: "Sorghum",
    crop_variety: "Local",
    area: 3000,
    production: 3600,
    crop_yield: 1.2,
    unit: "area in Hectare, production in Tonne, crop_yield in Tonne per Hectare",
    previous_years: [{ year: "2018-19", production: 3500, area: 2800 }],
    description: "Sorghum is drought-resistant and a staple for many.",
    note: ""
  },
  {
    id: "crop_008",
    fiscal_year: "2019-20",
    state: "Jharkhand",
    district: "Giridih",
    sub_district: "Giridih",
    season: "Rabi",
    crop: "Potato",
    crop_variety: "Kufri",
    area: 1500,
    production: 2500,
    crop_yield: 1.67,
    unit: "area in Hectare, production in Tonne, crop_yield in Tonne per Hectare",
    previous_years: [{ year: "2018-19", production: 2400, area: 1400 }],
    description: "Potatoes are a versatile food crop.",
    note: ""
  },
  {
    id: "crop_009",
    fiscal_year: "2019-20",
    state: "Jharkhand",
    district: "Deoghar",
    sub_district: "Deoghar",
    season: "Kharif",
    crop: "Paddy",
    crop_variety: "Swarna",
    area: 2200,
    production: 4400,
    crop_yield: 2.0,
    unit: "area in Hectare, production in Tonne, crop_yield in Tonne per Hectare",
    previous_years: [{ year: "2018-19", production: 4200, area: 2100 }],
    description: "Swarna is a popular variety of paddy.",
    note: ""
  },
  {
    id: "crop_010",
    fiscal_year: "2019-20",
    state: "Jharkhand",
    district: "Godda",
    sub_district: "Godda",
    season: "Kharif",
    crop: "Maize",
    crop_variety: "Local",
    area: 1800,
    production: 3600,
    crop_yield: 2.0,
    unit: "area in Hectare, production in Tonne, crop_yield in Tonne per Hectare",
    previous_years: [{ year: "2018-19", production: 3500, area: 1700 }],
    description: "Maize is a major crop for food and livestock.",
    note: ""
  },
  {
    id: "crop_011",
    fiscal_year: "2019-20",
    state: "Jharkhand",
    district: "Sahibganj",
    sub_district: "Sahibganj",
    season: "Kharif",
    crop: "Paddy",
    crop_variety: "Basmati",
    area: 2500,
    production: 5000,
    crop_yield: 2.0,
    unit: "area in Hectare, production in Tonne, crop_yield in Tonne per Hectare",
    previous_years: [{ year: "2018-19", production: 4800, area: 2400 }],
    description: "Basmati rice is known for its fragrance and flavor.",
    note: ""
  },
  {
    id: "crop_012",
    fiscal_year: "2019-20",
    state: "Jharkhand",
    district: "West Singhbhum",
    sub_district: "Chaibasa",
    season: "Kharif",
    crop: "Pulses",
    crop_variety: "Black Gram",
    area: 1200,
    production: 800,
    crop_yield: 0.67,
    unit: "area in Hectare, production in Tonne, crop_yield in Tonne per Hectare",
    previous_years: [{ year: "2018-19", production: 750, area: 1100 }],
    description: "Black Gram is high in protein and fiber.",
    note: ""
  },
  {
    id: "crop_013",
    fiscal_year: "2019-20",
    state: "Jharkhand",
    district: "Chatra",
    sub_district: "Chatra",
    season: "Rabi",
    crop: "Wheat",
    crop_variety: "Local",
    area: 2000,
    production: 4000,
    crop_yield: 2.0,
    unit: "area in Hectare, production in Tonne, crop_yield in Tonne per Hectare",
    previous_years: [{ year: "2018-19", production: 3800, area: 1900 }],
    description: "Wheat is essential for bread production.",
    note: ""
  },
  {
    id: "crop_014",
    fiscal_year: "2019-20",
    state: "Jharkhand",
    district: "Latehar",
    sub_district: "Latehar",
    season: "Kharif",
    crop: "Maize",
    crop_variety: "Local",
    area: 3500,
    production: 8750,
    crop_yield: 2.5,
    unit: "area in Hectare, production in Tonne, crop_yield in Tonne per Hectare",
    previous_years: [{ year: "2018-19", production: 8400, area: 3400 }],
    description: "Maize is a staple food and livestock feed.",
    note: ""
  },
  {
    id: "crop_015",
    fiscal_year: "2019-20",
    state: "Jharkhand",
    district: "Jamtara",
    sub_district: "Jamtara",
    season: "Kharif",
    crop: "Paddy",
    crop_variety: "Local",
    area: 1800,
    production: 3600,
    crop_yield: 2.0,
    unit: "area in Hectare, production in Tonne, crop_yield in Tonne per Hectare",
    previous_years: [{ year: "2018-19", production: 3500, area: 1700 }],
    description: "Paddy is essential for food security in India.",
    note: ""
  },
  {
    id: "crop_016",
    fiscal_year: "2019-20",
    state: "Jharkhand",
    district: "Khunti",
    sub_district: "Khunti",
    season: "Kharif",
    crop: "Pulses",
    crop_variety: "Toor Dal",
    area: 1500,
    production: 1000,
    crop_yield: 0.67,
    unit: "area in Hectare, production in Tonne, crop_yield in Tonne per Hectare",
    previous_years: [{ year: "2018-19", production: 950, area: 1400 }],
    description: "Toor Dal is a significant pulse crop in India.",
    note: ""
  },
  {
    id: "crop_017",
    fiscal_year: "2019-20",
    state: "Jharkhand",
    district: "Gumla",
    sub_district: "Gumla",
    season: "Kharif",
    crop: "Maize",
    crop_variety: "Local",
    area: 7577,
    production: 18852,
    crop_yield: 2.488,
    unit: "area in Hectare, production in Tonne, crop_yield in Tonne per Hectare",
    previous_years: [{ year: "2018-19", production: 18000, area: 7400 }],
    description: "Maize is a versatile crop used for food and fodder.",
    note: ""
  },
  {
    id: "crop_018",
    fiscal_year: "2019-20",
    state: "Jharkhand",
    district: "Simdega",
    sub_district: "Simdega",
    season: "Rabi",
    crop: "Wheat",
    crop_variety: "Durum",
    area: 2200,
    production: 6600,
    crop_yield: 3.0,
    unit: "area in Hectare, production in Tonne, crop_yield in Tonne per Hectare",
    previous_years: [{ year: "2018-19", production: 6200, area: 2100 }],
    description: "Durum wheat is primarily used for pasta.",
    note: ""
  },
  {
    id: "crop_019",
    fiscal_year: "2019-20",
    state: "Jharkhand",
    district: "Lohardaga",
    sub_district: "Lohardaga",
    season: "Kharif",
    crop: "Paddy",
    crop_variety: "Swarna",
    area: 3000,
    production: 6000,
    crop_yield: 2.0,
    unit: "area in Hectare, production in Tonne, crop_yield in Tonne per Hectare",
    previous_years: [{ year: "2018-19", production: 5800, area: 2900 }],
    description: "Swarna paddy is popular for its high yield.",
    note: ""
  },
  {
    id: "crop_020",
    fiscal_year: "2019-20",
    state: "Jharkhand",
    district: "Pakur",
    sub_district: "Pakur",
    season: "Rabi",
    crop: "Barley",
    crop_variety: "Local",
    area: 1300,
    production: 2600,
    crop_yield: 2.0,
    unit: "area in Hectare, production in Tonne, crop_yield in Tonne per Hectare",
    previous_years: [{ year: "2018-19", production: 2400, area: 1200 }],
    description: "Barley is used for food and animal feed.",
    note: ""
  },
  {
    id: "crop_021",
    fiscal_year: "2019-20",
    state: "Jharkhand",
    district: "Saraikela-Kharsawan",
    sub_district: "Saraikela",
    season: "Kharif",
    crop: "Groundnut",
    crop_variety: "Local",
    area: 2500,
    production: 5000,
    crop_yield: 2.0,
    unit: "area in Hectare, production in Tonne, crop_yield in Tonne per Hectare",
    previous_years: [{ year: "2018-19", production: 4800, area: 2400 }],
    description: "Groundnut is rich in oil and protein.",
    note: ""
  },
  {
    id: "crop_022",
    fiscal_year: "2019-20",
    state: "Jharkhand",
    district: "Ramgarh",
    sub_district: "Ramgarh",
    season: "Rabi",
    crop: "Mustard",
    crop_variety: "Local",
    area: 1800,
    production: 3600,
    crop_yield: 2.0,
    unit: "area in Hectare, production in Tonne, crop_yield in Tonne per Hectare",
    previous_years: [{ year: "2018-19", production: 3400, area: 1700 }],
    description: "Mustard is an important oilseed crop.",
    note: ""
  },
  {
    id: "crop_023",
    fiscal_year: "2019-20",
    state: "Jharkhand",
    district: "Koderma",
    sub_district: "Koderma",
    season: "Kharif",
    crop: "Paddy",
    crop_variety: "IR64",
    area: 2100,
    production: 4200,
    crop_yield: 2.0,
    unit: "area in Hectare, production in Tonne, crop_yield in Tonne per Hectare",
    previous_years: [{ year: "2018-19", production: 4000, area: 2000 }],
    description: "IR64 is a high-yielding paddy variety.",
    note: ""
  },
  {
    id: "crop_024",
    fiscal_year: "2019-20",
    state: "Jharkhand",
    district: "Garhwa",
    sub_district: "Garhwa",
    season: "Kharif",
    crop: "Paddy",
    crop_variety: "Basmati",
    area: 4000,
    production: 8000,
    crop_yield: 2.0,
    unit: "area in Hectare, production in Tonne, crop_yield in Tonne per Hectare",
    previous_years: [{ year: "2018-19", production: 7500, area: 3800 }],
    description: "Basmati rice is known for its fragrance and flavor.",
    note: ""
  },
];


const states = [
  { 
    name: 'Jharkhand', 
    districts: [
      'Ranchi', 
      'East Singhbhum', 
      'Hazaribagh', 
      'Dhanbad', 
      'Bokaro', 
      'Dumka', 
      'Palamu', 
      'Giridih', 
      'Deoghar', 
      'Godda', 
      'Sahibganj', 
      'West Singhbhum', 
      'Chatra', 
      'Latehar', 
      'Jamtara', 
      'Khunti', 
      'Gumla', 
      'Simdega', 
      'Lohardaga', 
      'Pakur', 
      'Saraikela-Kharsawan', 
      'Ramgarh', 
      'Koderma', 
      'Garhwa'
    ] 
  },
];


const soilTypes = ['Loamy', 'Sandy', 'Clay', 'Silt', 'Peaty', 'Saline'];

const cropCategories = [
  { type: 'Vegetable', crops: ['Tomato', 'Potato', 'Carrot'] },
  { type: 'Fruits', crops: ['Apple', 'Banana', 'Mango'] },
  { type: 'Cereal', crops: ['Wheat', 'Rice', 'Corn'] },
  { type: 'Legume', crops: ['Lentils', 'Chickpeas', 'Beans'] },
  { type: 'Nut', crops: ['Almond', 'Walnut', 'Peanut'] },
  { type: 'Oilseed', crops: ['Sunflower', 'Canola', 'Soybean'] },
  { type: 'Herb', crops: ['Basil', 'Parsley', 'Cilantro'] },
  { type: 'Root', crops: ['Beetroot', 'Radish', 'Turnip'] },
  { type: 'Grain', crops: ['Barley', 'Oats', 'Millet'] },
];

const createEmptyCrop = () => ({
  category: '',
  name: '',
  soilType: '',
  quantity: '',
  price: '',
  previousCrops: '',
  resources: '',
  cropImage: '',
  quality: '',
  weatherRecord: '',
});

const DistrictCheckboxSelect = ({ selectedDistricts, handleDistrictChange, selectedState, states }) => {
  const handleToggle = (district) => {
    const currentIndex = selectedDistricts.indexOf(district);
    const newSelectedDistricts = [...selectedDistricts];

    if (currentIndex === -1) {
      newSelectedDistricts.push(district);
    } else {
      newSelectedDistricts.splice(currentIndex, 1);
    }

    handleDistrictChange(newSelectedDistricts);
  };

  return (
    <Grid item xs={12}>
      <InputLabel>Select Districts</InputLabel>
      {selectedState && states.find(state => state.name === selectedState).districts.map((district) => (
        <FormControlLabel
          key={district}
          control={
            <Checkbox
              checked={selectedDistricts.indexOf(district) !== -1}
              onChange={() => handleToggle(district)}
            />
          }
          label={district}
        />
      ))}
    </Grid>
  );
};

const CropRecommendation = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const [crops, setCrops] = useState([createEmptyCrop()]);
  const [soilMapOpen, setSoilMapOpen] = useState(false);

  const handleFormSubmit = () => {
    setSnackbarMessage('Form submitted successfully!');
    setSnackbarOpen(true);
    setFormOpen(false);
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
    setSelectedDistricts([]);
  };

  const handleDistrictChange = (value) => {
    setSelectedDistricts(value);
  };

  const handleCropChange = (index, field, value) => {
    const updatedCrops = [...crops];
    updatedCrops[index][field] = value;
    setCrops(updatedCrops);
  };

  const handleAddCrop = () => {
    setCrops([...crops, createEmptyCrop()]);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Crop Recommendation
      </Typography>

      <Grid container spacing={2} marginBottom={2}>
        <Grid item>
          <Button variant="contained" onClick={() => setFormOpen(true)}>
            Open Crop Recommendation Form
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" color="info" onClick={() => setSoilMapOpen(true)}>
            Show Soil Types
          </Button>
        </Grid>
      </Grid>
      
      <Dialog open={formOpen} onClose={() => setFormOpen(false)}>
        <DialogTitle>Crop Recommendation Form</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputLabel>Select State</InputLabel>
              <Select value={selectedState} onChange={handleStateChange} fullWidth>
                <MenuItem value=""><em>None</em></MenuItem>
                {states.map((state) => (
                  <MenuItem key={state.name} value={state.name}>{state.name}</MenuItem>
                ))}
              </Select>
            </Grid>

            <DistrictCheckboxSelect
              selectedDistricts={selectedDistricts}
              handleDistrictChange={handleDistrictChange}
              selectedState={selectedState}
              states={states}
            />

            {crops.map((crop, index) => (
              <Grid item xs={12} key={index}>
                <InputLabel>Crop Category</InputLabel>
                <Select
                  value={crop.category}
                  onChange={(e) => handleCropChange(index, 'category', e.target.value)}
                  fullWidth
                >
                  <MenuItem value=""><em>Select Category</em></MenuItem>
                  {cropCategories.map((cat) => (
                    <MenuItem key={cat.type} value={cat.type}>{cat.type}</MenuItem>
                  ))}
                </Select>

                <InputLabel>Crop Name</InputLabel>
                <Select
                  value={crop.name}
                  onChange={(e) => handleCropChange(index, 'name', e.target.value)}
                  fullWidth
                  disabled={!crop.category}
                >
                  <MenuItem value=""><em>Select Crop</em></MenuItem>
                  {cropCategories.find(cat => cat.type === crop.category)?.crops.map((cropName) => (
                    <MenuItem key={cropName} value={cropName}>{cropName}</MenuItem>
                  ))}
                </Select>

                <FormControl fullWidth margin="normal">
                  <InputLabel>Soil Type</InputLabel>
                  <Select
                    value={crop.soilType}
                    onChange={(e) => handleCropChange(index, 'soilType', e.target.value)}
                    fullWidth
                  >
                    <MenuItem value=""><em>Select Soil Type</em></MenuItem>
                    {soilTypes.map((soilType) => (
                      <MenuItem key={soilType} value={soilType}>{soilType}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Tooltip title="Enter quantity in kilograms">
                  <TextField
                    label="Quantity (kg)"
                    fullWidth
                    type="number"
                    value={crop.quantity}
                    onChange={(e) => handleCropChange(index, 'quantity', e.target.value)}
                    required
                    margin="normal"
                  />
                </Tooltip>

                <Tooltip title="Enter price in INR">
                  <TextField
                    label="Price (INR)"
                    fullWidth
                    value={crop.price}
                    onChange={(e) => handleCropChange(index, 'price', e.target.value)}
                    required
                    margin="normal"
                  />
                </Tooltip>

                <Tooltip title="List previous crops grown">
                  <TextField
                    label="Previous Crops"
                    fullWidth
                    value={crop.previousCrops}
                    onChange={(e) => handleCropChange(index, 'previousCrops', e.target.value)}
                    required
                    margin="normal"
                  />
                </Tooltip>

                <Tooltip title="List available resources (e.g., water, fertilizers)">
                  <TextField
                    label="Available Resources"
                    fullWidth
                    value={crop.resources}
                    onChange={(e) => handleCropChange(index, 'resources', e.target.value)}
                    required
                    margin="normal"
                  />
                </Tooltip>

                <Grid container spacing={1} marginTop={2}>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      component="label"
                      startIcon={<LocalFloristIcon />}
                      fullWidth
                    >
                      Upload Crop Image
                      <input type="file" hidden />
                    </Button>
                  </Grid>
                </Grid>

                <Tooltip title="Enter the quality of the crop">
                  <TextField
                    label="Quality"
                    fullWidth
                    value={crop.quality}
                    onChange={(e) => handleCropChange(index, 'quality', e.target.value)}
                    margin="normal"
                  />
                </Tooltip>

                <Tooltip title="Weather records (e.g., rainfall, temperature)">
                  <TextField
                    label="Weather Record"
                    fullWidth
                    value={crop.weatherRecord}
                    onChange={(e) => handleCropChange(index, 'weatherRecord', e.target.value)}
                    margin="normal"
                  />
                </Tooltip>
              </Grid>
            ))}

            <Grid item xs={12}>
              <Grid container spacing={2} justifyContent="space-between" marginTop={2}>
                <Grid item>
                  <Button variant="contained" startIcon={<UploadFileIcon />}>
                    Upload Media
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" startIcon={<QrCodeIcon />}>
                    Scan Code
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    color="warning"
                    variant="outlined"
                    onClick={handleAddCrop}
                  >
                    Add Another Crop
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color="warning" variant='outlined' onClick={() => setFormOpen(false)}>Cancel</Button>
          <Button color="success" variant="contained" onClick={handleFormSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>

      <SoilPopup isOpen={soilMapOpen} onClose={() => setSoilMapOpen(false)} />

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity="info">
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {selectedState && selectedDistricts.length > 0 && (
        <div>
          <Typography variant="h5" gutterBottom>
            Crop Data Analysis
          </Typography>
          <CropDataCharts data={cropData} selectedState={selectedState} selectedDistricts={selectedDistricts} />
        </div>
      )}
      <JharkhandInfo />
    </Container>
  );
};

export default CropRecommendation;  