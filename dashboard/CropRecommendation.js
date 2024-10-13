import React, { useState } from 'react';
import Papa from 'papaparse';
import { Bar } from 'react-chartjs-2';
import {
  Button,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Sample crop data
const cropData = [
  {
    fiscal_year: "2019-20",
    state: "Jharkhand",
    district: "West Singhbhum",
    season: "Rabi",
    crop: "Maize",
    area: 8,
    production: 17,
    crop_yield: 2.125,
    unit: "area in Hectare, production in Tonne, crop_yield in Tonne per Hectare",
    note: ""
  },
  {
    fiscal_year: "2019-20",
    state: "Jharkhand",
    district: "Ranchi",
    season: "Rabi",
    crop: "Masoor",
    area: 2755,
    production: 2204,
    crop_yield: 0.8,
    unit: "area in Hectare, production in Tonne, crop_yield in Tonne per Hectare",
    note: ""
  },
  // Add the remaining data rows here...
  {
    fiscal_year: "2019-20",
    state: "Jharkhand",
    district: "Gumla",
    season: "Kharif",
    crop: "Maize",
    area: 7577,
    production: 18852,
    crop_yield: 2.488,
    unit: "area in Hectare, production in Tonne, crop_yield in Tonne per Hectare",
    note: ""
  },
];

const CropRecommendation = () => {
  const [data, setData] = useState([]);
  const [analysisData, setAnalysisData] = useState(null);
  const [currentTemperatureFahrenheit, setCurrentTemperatureFahrenheit] = useState(32); // Default to freezing

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          setData(results.data);
          analyzeData(results.data);
        },
        error: (error) => {
          console.error('Error reading CSV:', error);
        },
      });
    }
  };

  const analyzeData = (data) => {
    const totalProduction = {};
    const totalArea = {};
    const totalYield = {};
    const analysisResults = {};

    data.forEach(row => {
      const state = row['State Name'];

      if (!analysisResults[state]) {
        analysisResults[state] = {};
      }

      const crops = [
        'RICE', 'WHEAT', 'KHARIF SORGHUM', 'RABI SORGHUM', 'SORGHUM',
        'PEARL MILLET', 'MAIZE', 'FINGER MILLET', 'BARLEY', 'CHICKPEA',
        'PIGEONPEA', 'MINOR PULSES', 'GROUNDNUT', 'SESAMUM',
        'RAPESEED AND MUSTARD', 'SAFFLOWER', 'CASTOR', 'LINSEED',
        'SUNFLOWER', 'SOYABEAN', 'OILSEEDS', 'SUGARCANE', 'COTTON',
      ];

      crops.forEach(crop => {
        const areaKey = `${crop} AREA (1000 ha)`;
        const productionKey = `${crop} PRODUCTION (1000 tons)`;

        totalProduction[crop] = (totalProduction[crop] || 0) + (row[productionKey] || 0);
        totalArea[crop] = (totalArea[crop] || 0) + (row[areaKey] || 0);
        totalYield[crop] = (totalYield[crop] || 0) + (row[productionKey] / (row[areaKey] || 1)) || 0;

        if (!analysisResults[state][crop]) {
          analysisResults[state][crop] = { production: 0, area: 0 };
        }
        analysisResults[state][crop].production += row[productionKey] || 0;
        analysisResults[state][crop].area += row[areaKey] || 0;
      });
    });

    setAnalysisData({ totalProduction, totalArea, totalYield, analysisResults });
  };

  const getChartData = (type) => {
    if (!analysisData) return { labels: [], datasets: [] };

    let labels = [];
    let datasets = [];
    const crops = Object.keys(analysisData.totalProduction);

    if (type === 'totalProduction') {
      labels = crops;
      datasets = [{
        label: 'Total Production (1000 tons)',
        data: crops.map(crop => analysisData.totalProduction[crop]),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      }];
    } else if (type === 'totalArea') {
      labels = crops;
      datasets = [{
        label: 'Total Area (1000 ha)',
        data: crops.map(crop => analysisData.totalArea[crop]),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      }];
    } else if (type === 'averageYield') {
      labels = crops;
      datasets = [{
        label: 'Average Yield (Kg per ha)',
        data: crops.map(crop => (analysisData.totalYield[crop] / data.length) || 0),
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
      }];
    } else if (type === 'stateProduction') {
      const stateLabels = Object.keys(analysisData.analysisResults);
      labels = stateLabels;

      datasets = crops.map(crop => ({
        label: crop,
        data: stateLabels.map(state => analysisData.analysisResults[state][crop]?.production || 0),
        backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`,
      }));
    } else if (type === 'stateArea') {
      const stateLabels = Object.keys(analysisData.analysisResults);
      labels = stateLabels;

      datasets = crops.map(crop => ({
        label: crop,
        data: stateLabels.map(state => analysisData.analysisResults[state][crop]?.area || 0),
        backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`,
      }));
    }

    return { labels, datasets };
  };

  const recommendCrops = () => {
    if (!analysisData) return [];

    // Example crop recommendations based on temperature
    if (currentTemperatureFahrenheit < 50) {
      return ['WHEAT', 'BARLEY']; // Cool-season crops
    } else if (currentTemperatureFahrenheit >= 50 && currentTemperatureFahrenheit < 80) {
      return ['RICE', 'MAIZE']; // Moderate crops
    } else {
      return ['COTTON', 'SORGHUM']; // Warm-season crops
    }
  };

  const recommendedCrops = recommendCrops();

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Crop Statistics
      </Typography>
      <Button
        variant="contained" 
        onClick={() => window.open('https://drdpat.bih.nic.in/HS-A-Table-04.htm', '_blank')}
      >
        View Indian Crop Statistics
      </Button>
      <Button
        variant="contained"
        component="label"
        style={{ margin: '20px' }}
      >
        Upload CSV
        <input type="file" hidden accept=".csv" onChange={handleFileChange} />
      </Button>
      <div>
        <Typography variant="h5" style={{ marginTop: '20px' }}>
          Crop Recommendations
        </Typography>
        {recommendedCrops.length > 0 ? (
          <ul>
            {recommendedCrops.map(crop => (
              <li key={crop}>{crop}</li>
            ))}
          </ul>
        ) : (
          <p>No recommendations available.</p>
        )}
      </div>
      {analysisData && (
        <>
          <Typography variant="h5">Total Production by Crop</Typography>
          <Bar data={getChartData('totalProduction')} options={{ scales: { y: { beginAtZero: true } } }} />

          <Typography variant="h5">Total Area by Crop</Typography>
          <Bar data={getChartData('totalArea')} options={{ scales: { y: { beginAtZero: true } } }} />

          <Typography variant="h5">Average Yield by Crop</Typography>
          <Bar data={getChartData('averageYield')} options={{ scales: { y: { beginAtZero: true } } }} />

          <Typography variant="h5">Production by State for Each Crop</Typography>
          <Bar data={getChartData('stateProduction')} options={{ scales: { y: { beginAtZero: true } } }} />

          <Typography variant="h5">Area by State for Each Crop</Typography>
          <Bar data={getChartData('stateArea')} options={{ scales: { y: { beginAtZero: true } } }} />

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Crop Type</TableCell>
                  <TableCell>Total Area (1000 ha)</TableCell>
                  <TableCell>Total Production (1000 tons)</TableCell>
                  <TableCell>Average Yield (Kg per ha)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(analysisData?.totalProduction || {}).map((crop) => (
                  <TableRow key={crop}>
                    <TableCell>{crop}</TableCell>
                    <TableCell>{analysisData.totalArea[crop]?.toFixed(2) || 0}</TableCell>
                    <TableCell>{analysisData.totalProduction[crop]?.toFixed(2) || 0}</TableCell>
                    <TableCell>{(analysisData.totalYield[crop] / data.length).toFixed(2) || 0}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Container>
  );
};

export default CropRecommendation;
