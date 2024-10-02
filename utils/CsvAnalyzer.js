import React, { useState } from 'react';
import Papa from 'papaparse';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { TextField, MenuItem, Button, Box } from '@mui/material';

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CsvAnalyzer = () => {
  const [cropData, setCropData] = useState([]);
  const [data, setData] = useState([]);
  const [analysisData, setAnalysisData] = useState(null);
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [uniqueStates, setUniqueStates] = useState([]);
  const [uniqueDistricts, setUniqueDistricts] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          setData(results.data);
          setCropData(results.data); // Pass parsed data to parent
          analyzeData(results.data);
        },
        error: (error) => {
          console.error('Error reading CSV:', error);
        },
      });
    }
  };

  const analyzeData = (data) => {
    const analysisResults = {};
    const totalArea = {};
    const totalProduction = {};
    const totalYield = {};

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
        const yieldKey = `${crop} YIELD (Kg per ha)`;

        // Aggregate production and area
        totalProduction[crop] = (totalProduction[crop] || 0) + (row[productionKey] || 0);
        totalArea[crop] = (totalArea[crop] || 0) + (row[areaKey] || 0);
        totalYield[crop] = (totalYield[crop] || 0) + (row[productionKey] / (row[areaKey] || 1)) || 0;

        // State-wise aggregation
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

  return (
    <div>
      <h1>CSV Analyzer</h1>
      <input type="file" accept=".csv" onChange={handleFileChange} />

      {analysisData && (
        <>
          <Box sx={{ marginTop: 2, marginBottom: 2 }}>
            <TextField
              select
              label="Select State"
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                // Filter districts based on selected state
                const districts = data.filter(row => row['State Name'] === e.target.value)
                                       .map(row => row['Dist Name']);
                setUniqueDistricts([...new Set(districts)]);
              }}
              fullWidth
              variant="outlined"
              sx={{ marginBottom: 2 }}
            >
              {uniqueStates.map((state) => (
                <MenuItem key={state} value={state}>
                  {state}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Select District"
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              fullWidth
              variant="outlined"
            >
              {uniqueDistricts.map((district) => (
                <MenuItem key={district} value={district}>
                  {district}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          <h2>Total Production by Crop</h2>
          <Bar data={getChartData('totalProduction')} options={{ scales: { y: { beginAtZero: true } } }} />

          <h2>Total Area by Crop</h2>
          <Bar data={getChartData('totalArea')} options={{ scales: { y: { beginAtZero: true } } }} />

          <h2>Average Yield by Crop</h2>
          <Bar data={getChartData('averageYield')} options={{ scales: { y: { beginAtZero: true } } }} />

          <h2>Production by State for Each Crop</h2>
          <Bar data={getChartData('stateProduction')} options={{ scales: { y: { beginAtZero: true } } }} />

          <h2>Area by State for Each Crop</h2>
          <Bar data={getChartData('stateArea')} options={{ scales: { y: { beginAtZero: true } } }} />
        </>
      )}
    </div>
  );
};

export default CsvAnalyzer;
