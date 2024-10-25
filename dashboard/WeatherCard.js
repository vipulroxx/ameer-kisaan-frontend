import React, { useEffect, useState, useMemo } from 'react';
import {
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  IconButton,
  Snackbar,
  Alert,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { FaLocationArrow, FaCloudSunRain, FaSeedling, FaRadiation, FaThermometerHalf, FaWind, FaTint, FaCloudRain, FaSun, FaUmbrella } from 'react-icons/fa';
import JharkhandInfo from '../auth/JharkhandInfo';


// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);


const data = [
  // Andaman and Nicobar
  { state: 'Andaman and Nicobar', commodity: 'Amaranthus', minPrice: 8000, maxPrice: 10000 },
  { state: 'Andaman and Nicobar', commodity: 'Banana - Green', minPrice: 5000, maxPrice: 7000 },
  { state: 'Andaman and Nicobar', commodity: 'Black Pepper', minPrice: 130000, maxPrice: 150000 },

  // Andhra Pradesh
  { state: 'Andhra Pradesh', commodity: 'Tomato', minPrice: 500, maxPrice: 1500 },
  { state: 'Andhra Pradesh', commodity: 'Bengal Gram', minPrice: 4800, maxPrice: 5000 },
  { state: 'Andhra Pradesh', commodity: 'Jowar', minPrice: 2000, maxPrice: 2100 },

  // Assam
  { state: 'Assam', commodity: 'Lentil', minPrice: 6000, maxPrice: 8000 },
  { state: 'Assam', commodity: 'Rice', minPrice: 2500, maxPrice: 3000 },
  { state: 'Assam', commodity: 'Mustard Seeds', minPrice: 6000, maxPrice: 7000 },

  // Bihar
  { state: 'Bihar', commodity: 'Potato', minPrice: 3000, maxPrice: 4000 },
  { state: 'Bihar', commodity: 'Cauliflower', minPrice: 4000, maxPrice: 5000 },
  { state: 'Bihar', commodity: 'Onion', minPrice: 3000, maxPrice: 4000 },

  // Chhattisgarh
  { state: 'Chhattisgarh', commodity: 'Rice', minPrice: 2200, maxPrice: 2800 },
  { state: 'Chhattisgarh', commodity: 'Soybean', minPrice: 4000, maxPrice: 5000 },
  { state: 'Chhattisgarh', commodity: 'Pigeon Pea', minPrice: 4500, maxPrice: 5500 },

  // Goa
  { state: 'Goa', commodity: 'Coconut', minPrice: 5000, maxPrice: 6000 },
  { state: 'Goa', commodity: 'Pineapple', minPrice: 4000, maxPrice: 5000 },
  { state: 'Goa', commodity: 'Tomato', minPrice: 3000, maxPrice: 4000 },

  // Gujarat
  { state: 'Gujarat', commodity: 'Cotton', minPrice: 5000, maxPrice: 6000 },
  { state: 'Gujarat', commodity: 'Groundnut', minPrice: 4000, maxPrice: 5000 },
  { state: 'Gujarat', commodity: 'Wheat', minPrice: 2400, maxPrice: 2800 },

  // Haryana
  { state: 'Haryana', commodity: 'Wheat', minPrice: 2200, maxPrice: 2600 },
  { state: 'Haryana', commodity: 'Rice', minPrice: 2400, maxPrice: 2800 },
  { state: 'Haryana', commodity: 'Mustard', minPrice: 5000, maxPrice: 6000 },

  // Himachal Pradesh
  { state: 'Himachal Pradesh', commodity: 'Apple', minPrice: 10000, maxPrice: 15000 },
  { state: 'Himachal Pradesh', commodity: 'Peach', minPrice: 8000, maxPrice: 10000 },
  { state: 'Himachal Pradesh', commodity: 'Plum', minPrice: 6000, maxPrice: 8000 },

  // Jharkhand
  { state: 'Jharkhand', commodity: 'Rice', minPrice: 2400, maxPrice: 2800 },
  { state: 'Jharkhand', commodity: 'Pulses', minPrice: 4000, maxPrice: 5000 },
  { state: 'Jharkhand', commodity: 'Potato', minPrice: 1800, maxPrice: 2200 },

  // Karnataka
  { state: 'Karnataka', commodity: 'Coffee', minPrice: 6000, maxPrice: 8000 },
  { state: 'Karnataka', commodity: 'Rice', minPrice: 2400, maxPrice: 2800 },
  { state: 'Karnataka', commodity: 'Onion', minPrice: 3500, maxPrice: 4000 },

  // Kerala
  { state: 'Kerala', commodity: 'Coconut', minPrice: 4000, maxPrice: 5000 },
  { state: 'Kerala', commodity: 'Banana', minPrice: 6000, maxPrice: 7000 },
  { state: 'Kerala', commodity: 'Tea', minPrice: 8000, maxPrice: 10000 },

  // Madhya Pradesh
  { state: 'Madhya Pradesh', commodity: 'Wheat', minPrice: 1800, maxPrice: 2200 },
  { state: 'Madhya Pradesh', commodity: 'Rice', minPrice: 2000, maxPrice: 2400 },
  { state: 'Madhya Pradesh', commodity: 'Pulses', minPrice: 4500, maxPrice: 5500 },

  // Maharashtra
  { state: 'Maharashtra', commodity: 'Sugarcane', minPrice: 2800, maxPrice: 3200 },
  { state: 'Maharashtra', commodity: 'Cotton', minPrice: 3500, maxPrice: 4500 },
  { state: 'Maharashtra', commodity: 'Turmeric', minPrice: 7000, maxPrice: 9000 },

  // Manipur
  { state: 'Manipur', commodity: 'Rice', minPrice: 3500, maxPrice: 4000 },
  { state: 'Manipur', commodity: 'Chili', minPrice: 5000, maxPrice: 6000 },
  { state: 'Manipur', commodity: 'Potato', minPrice: 2500, maxPrice: 3000 },

  // Meghalaya
  { state: 'Meghalaya', commodity: 'Rice', minPrice: 2800, maxPrice: 3200 },
  { state: 'Meghalaya', commodity: 'Potato', minPrice: 1800, maxPrice: 2200 },
  { state: 'Meghalaya', commodity: 'Pineapple', minPrice: 4000, maxPrice: 5000 },

  // Mizoram
  { state: 'Mizoram', commodity: 'Rice', minPrice: 2200, maxPrice: 2800 },
  { state: 'Mizoram', commodity: 'Chili', minPrice: 5000, maxPrice: 6000 },
  { state: 'Mizoram', commodity: 'Cabbage', minPrice: 1800, maxPrice: 2200 },

  // Nagaland
  { state: 'Nagaland', commodity: 'Rice', minPrice: 3500, maxPrice: 4000 },
  { state: 'Nagaland', commodity: 'Chili', minPrice: 5000, maxPrice: 6000 },
  { state: 'Nagaland', commodity: 'Potato', minPrice: 2500, maxPrice: 3000 },

  // Odisha
  { state: 'Odisha', commodity: 'Rice', minPrice: 2000, maxPrice: 2400 },
  { state: 'Odisha', commodity: 'Pulses', minPrice: 4000, maxPrice: 5000 },
  { state: 'Odisha', commodity: 'Mustard', minPrice: 5000, maxPrice: 6000 },

  // Punjab
  { state: 'Punjab', commodity: 'Wheat', minPrice: 1800, maxPrice: 2200 },
  { state: 'Punjab', commodity: 'Rice', minPrice: 2400, maxPrice: 2800 },
  { state: 'Punjab', commodity: 'Barley', minPrice: 1500, maxPrice: 2000 },

  // Rajasthan
  { state: 'Rajasthan', commodity: 'Wheat', minPrice: 1800, maxPrice: 2200 },
  { state: 'Rajasthan', commodity: 'Mustard', minPrice: 5000, maxPrice: 6000 },
  { state: 'Rajasthan', commodity: 'Coriander', minPrice: 6000, maxPrice: 7000 },

  // Sikkim
  { state: 'Sikkim', commodity: 'Potato', minPrice: 3000, maxPrice: 3500 },
  { state: 'Sikkim', commodity: 'Green Tea', minPrice: 6000, maxPrice: 7000 },
  { state: 'Sikkim', commodity: 'Chili', minPrice: 5000, maxPrice: 6000 },

  // Tamil Nadu
  { state: 'Tamil Nadu', commodity: 'Rice', minPrice: 2400, maxPrice: 2800 },
  { state: 'Tamil Nadu', commodity: 'Banana', minPrice: 4000, maxPrice: 5000 },
  { state: 'Tamil Nadu', commodity: 'Chili', minPrice: 5000, maxPrice: 6000 },

  // Telangana
  { state: 'Telangana', commodity: 'Rice', minPrice: 2200, maxPrice: 2600 },
  { state: 'Telangana', commodity: 'Chili', minPrice: 5000, maxPrice: 6000 },
  { state: 'Telangana', commodity: 'Cotton', minPrice: 4000, maxPrice: 5000 },

  // Tripura
  { state: 'Tripura', commodity: 'Rice', minPrice: 2800, maxPrice: 3200 },
  { state: 'Tripura', commodity: 'Pulses', minPrice: 3500, maxPrice: 4500 },
  { state: 'Tripura', commodity: 'Vegetables', minPrice: 2000, maxPrice: 2500 },

  // Uttarakhand
  { state: 'Uttarakhand', commodity: 'Potato', minPrice: 3000, maxPrice: 3500 },
  { state: 'Uttarakhand', commodity: 'Apple', minPrice: 10000, maxPrice: 15000 },
  { state: 'Uttarakhand', commodity: 'Green Peas', minPrice: 4000, maxPrice: 5000 },

  // Uttar Pradesh
  { state: 'Uttar Pradesh', commodity: 'Sugarcane', minPrice: 2800, maxPrice: 3200 },
  { state: 'Uttar Pradesh', commodity: 'Wheat', minPrice: 1800, maxPrice: 2200 },
  { state: 'Uttar Pradesh', commodity: 'Rice', minPrice: 2400, maxPrice: 2800 },

  // West Bengal
  { state: 'West Bengal', commodity: 'Rice', minPrice: 2400, maxPrice: 2800 },
  { state: 'West Bengal', commodity: 'Potato', minPrice: 1800, maxPrice: 2200 },
  { state: 'West Bengal', commodity: 'Jute', minPrice: 3500, maxPrice: 4000 },
];

// Adding average price to each item
data.forEach(item => {
  item.avgPrice = (item.minPrice + item.maxPrice) / 2;
});

const cropPrices = data;

const cropColors = {
  Amaranthus: 'rgba(255, 99, 132, 0.6)',
  'Banana - Green': 'rgba(54, 162, 235, 0.6)',
  Potato: 'rgba(54, 162, 235, 0.6)',
  Tomato: 'rgba(255, 206, 86, 0.6)',
  Spinach: 'rgba(153, 102, 255, 0.6)',
  Cabbage: 'rgba(255, 159, 64, 0.6)',
  Cauliflower: 'rgba(201, 203, 207, 0.6)',
  ClusterBeans: 'rgba(255, 99, 71, 0.6)',
  Coconut: 'rgba(200, 200, 50, 0.6)',
  Colacasia: 'rgba(255, 165, 0, 0.6)',
  Onion: 'rgba(135, 206, 235, 0.6)',
  Rice: 'rgba(100, 149, 237, 0.6)',
  Lentil: 'rgba(0, 128, 0, 0.6)',
  'Bengal Gram': 'rgba(255, 20, 147, 0.6)',
  Jowar: 'rgba(255, 192, 203, 0.6)',
  Paddy: 'rgba(65, 105, 225, 0.6)',
  Sugarcane: 'rgba(139, 69, 19, 0.6)',
  Wheat: 'rgba(245, 222, 179, 0.6)',
  Mustard: 'rgba(218, 165, 32, 0.6)',
  Pulses: 'rgba(240, 230, 140, 0.6)',
  Cotton: 'rgba(0, 191, 255, 0.6)',
  Chili: 'rgba(255, 0, 0, 0.6)',
  'Green Tea': 'rgba(34, 139, 34, 0.6)',
  Pineapple: 'rgba(255, 215, 0, 0.6)',
  'Black Pepper': 'rgba(0, 0, 0, 0.6)',
  Barley: 'rgba(186, 218, 86, 0.6)',
  Groundnut: 'rgba(255, 127, 80, 0.6)',
  'Green Peas': 'rgba(0, 255, 0, 0.6)',
  Apple: 'rgba(255, 0, 255, 0.6)',
  Peach: 'rgba(255, 192, 203, 0.6)',
  Plum: 'rgba(148, 0, 211, 0.6)',
  CoconutWater: 'rgba(64, 224, 208, 0.6)',
  Turmeric: 'rgba(255, 140, 0, 0.6)',
  Sesame: 'rgba(255, 20, 147, 0.6)',
  Tapioca: 'rgba(255, 228, 181, 0.6)',
  'Mustard Seeds': 'rgba(255, 228, 196, 0.6)',
};

const helpTexts = {
  pieChart: "This pie chart shows the average prices of different crops.\n"+
             "Purpose: To visualize the proportion of each crop's average price compared to the total.\n" +
             "Attributes: Each slice represents a crop, and the size of the slice indicates its average price.\n" +
             "Impact: Helps farmers understand which crops are currently valued higher, enabling better planning for planting and selling.\n" +
             "Metrics: Average price is calculated based on the minimum and maximum prices observed.",

  forecastChart: "This bar chart displays the 10-day temperature forecast.\n" +
                 "Purpose: To provide insight into expected weather conditions, crucial for planning agricultural activities.\n" +
                 "Attributes: Two sets of bars represent maximum and minimum temperatures for each day.\n" +
                 "Impact: Helps farmers anticipate temperature fluctuations that could affect crop health and yield.\n" +
                 "Metrics: Temperatures are measured in degrees Celsius and are forecasted for the next ten days.",

  historicalChart: "This bar chart represents the historical temperature data over the last few days.\n" +
                   "Purpose: To give context to current weather by showing how temperatures have varied in recent days.\n" +
                   "Attributes: Each bar corresponds to the temperature recorded on a specific day.\n" +
                   "Impact: Farmers can assess past weather patterns to make informed decisions about future crop management.\n" +
                   "Metrics: Temperature is measured in degrees Celsius over a specified period.",

  hourlyForecastChart: "This line chart illustrates the hourly temperature and humidity forecast.\n" +
                       "Purpose: To provide detailed weather information over the course of a day, assisting in time-sensitive agricultural tasks.\n" +
                       "Attributes: Two lines represent temperature and humidity, plotted over the hours of the day.\n" +
                       "Impact: Helps farmers plan irrigation, harvesting, and other activities based on hourly conditions.\n" +
                       "Metrics: Temperature in degrees Celsius and humidity in percentage, measured at hourly intervals.",

  cropPricesChart: "This bar chart shows the average crop prices by state.\n" +
                   "Purpose: To compare the average prices of various crops across different states, aiding in market analysis.\n" +
                   "Attributes: Each bar represents a state, and the height indicates the average price of crops produced there.\n" +
                   "Impact: Enables farmers to identify which states have higher prices for certain crops, guiding decisions on where to sell.\n" +
                   "Metrics: Average prices are computed from the minimum and maximum price ranges for each crop."
};

const WeatherDashboard = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [historicalData, setHistoricalData] = useState([]);
  const [forecastData, setForecastData] = useState([]);
  const [currentHelpText, setCurrentHelpText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');


  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const formatHelpText = (text) => {
    const lines = text.split('\n').map((line, index) => {
      // Check if the line contains specific keywords and format accordingly
      if (line.includes("This")) {
        return (
          <Typography key={index} variant="body1" fontWeight="bold" color="blue">
            {line}
          </Typography>
        );
      } else if (line.includes("Purpose:") || line.includes("Attributes:") || line.includes("Impact:") || line.includes("Metrics:")) {
        // Split the line into two parts: label and content
        const [label, ...content] = line.split(/:(.+)/); // Split on the first occurrence of ":"
        return (
          <Typography key={index} variant="body2">
            <span style={{ fontWeight: 'bold', color:"red" }}>{label}:</span> {content.join(':')}
          </Typography>
        );
      }
      return <Typography key={index} variant="body2">{line}</Typography>;
    });
  
    return lines;
  };
  
  const handleHelpOpen = (text) => {
    setCurrentHelpText(text);
    setDialogOpen(true);
  };

  const handleHelpClose = () => {
    setDialogOpen(false);
  };

  // Function to fetch weather data
  const fetchWeatherData = async () => {
    const latitude = 22.8046;
    const longitude = 86.2029;

    try {
      setLoading(true);
      const [currentResponse, historicalResponse, forecastResponse] = await Promise.all([
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation`),
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&past_days=10&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`),
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min`)
      ]);

      if (!currentResponse.ok || !historicalResponse.ok || !forecastResponse.ok) {
        throw new Error('Network response was not ok');
      }

      const currentResult = await currentResponse.json();
      const historicalResult = await historicalResponse.json();
      const forecastResult = await forecastResponse.json();

      setCurrentWeather(currentResult.current);
      setHourlyForecast(currentResult.hourly);
      setHistoricalData(historicalResult.hourly);
      setForecastData(forecastResult.daily);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const pieChartData = useMemo(() => ({
    labels: cropPrices.map(item => item.commodity),
    datasets: [{
      label: 'Average Prices',
      data: cropPrices.map(item => item.avgPrice),
      backgroundColor: cropPrices.map(item => cropColors[item.commodity] || 'rgba(200, 200, 200, 0.6)'),
    }],
  }), [cropPrices]);


  const getColorByValue = (value, type) => {
    if (type === 'ph') {
      // pH color representation
      if (value < 6) return 'rgba(255, 99, 132, 0.6)'; // Red for acidic
      if (value < 7) return 'rgba(255, 206, 86, 0.6)'; // Yellow for mild
      return 'rgba(75, 192, 192, 0.6)'; // Green for neutral to basic
    }
    if (type === 'temp') {
      // Temperature color representation
      if (value < 15) return 'rgba(255, 99, 132, 0.6)'; // Red for low
      if (value < 25) return 'rgba(255, 206, 86, 0.6)'; // Yellow for mild
      return 'rgba(75, 192, 192, 0.6)'; // Green for high
    }
    return 'rgba(200, 200, 200, 0.6)'; // Default color
  };


  // Bar chart data for forecast
  const forecastChartData = {
    labels: forecastData.time,
    datasets: [
      {
        label: 'Max Temperature (°C)',
        data: forecastData.temperature_2m_max,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
      {
        label: 'Min Temperature (°C)',
        data: forecastData.temperature_2m_min,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  // Bar chart data for historical weather
  const historicalChartData = {
    labels: historicalData.time,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: historicalData.temperature_2m,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  // Bar chart data for crop prices by state
  const barChartData = {
    labels: cropPrices.map(item => item.state),
    datasets: [
      {
        label: 'Crop Prices',
        data: cropPrices.map(item => item.avgPrice),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  // Line chart data for hourly forecast
  const hourlyForecastChartData = {
    labels: hourlyForecast.time,
    datasets: [
      {
        label: 'Hourly Temperature (°C)',
        data: hourlyForecast.temperature_2m,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
      {
        label: 'Hourly Humidity (%)',
        data: hourlyForecast.relative_humidity_2m,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
      },
    ],
  };

  const handleInfoOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <Container>
      <Grid container spacing={4}>
        {/* Current Weather Card */}
        <Grid item xs={12} sm={6}>
          <Card style={{ height: '600px' }}>
            <CardContent>
              <Typography variant="h4">Current Weather</Typography>
              {currentWeather && (
                <>
                  <p><FaLocationArrow/> Location: Raydih, Adityapur, Jamshedpur</p>
                  <p><FaThermometerHalf /> Temperature: {currentWeather.temperature_2m} °C</p>
                  <p><FaWind /> Wind Speed: {currentWeather.wind_speed_10m} kph</p>
                  <p><FaTint /> Humidity: 71 %</p>
                  <p><FaCloudRain /> Precipitation: 2 %</p>
                  <p><FaSun /> Sunrise: 5:41 AM</p>
                  <p><FaUmbrella /> Sunset: 5:35 PM</p>
                  <p><FaCloudSunRain /> Chance of Rain: 80%</p>
                  <p><FaCloudRain /> Atmospheric Pressure: ↑ 29.76 in</p>
                  <p><FaSeedling/> Soil Type: Red gravelly</p>
                  <p><FaRadiation/> Soil pH: 6.8</p>
                  <div style={{ width: '100%', background: '#ddd', borderRadius: '5px', marginTop: '5px' }}>
                    <div style={{
                      width: `${(6.8 / 14) * 100}%`,
                      height: '10px',
                      background: getColorByValue(currentWeather.phLevel, 'ph'),
                      borderRadius: '5px'
                    }} />
                  </div>
                  <p><FaThermometerHalf/> Soil Temperature: {currentWeather.temperature_2m} °C</p>
                  <div style={{ width: '100%', background: '#ddd', borderRadius: '5px', marginTop: '5px' }}>
                    <div style={{
                      width: `${Math.min(currentWeather.temperature_2m, 40) / 40 * 100}%`,
                      height: '10px',
                      background: getColorByValue(currentWeather.temperature_2m, 'temp'),
                      borderRadius: '5px'
                    }} />
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
        
        {/* Pie Chart of Average Prices */}
        <Grid item xs={12} sm={6}>
          <Card style={{ height: '600px', position: 'relative' }}>
            <CardContent>
              <Typography variant="h5">Pie Chart of Average Prices</Typography>
              <IconButton 
                style={{ position: 'absolute', top: 16, right: 16, color: 'red' }} 
                onClick={() => handleHelpOpen(helpTexts.pieChart)}
              >
                <HelpIcon />
              </IconButton>
              <Pie data={pieChartData} options={{ responsive: true }} />
            </CardContent>
          </Card>
        </Grid>

        {/* Bar Chart for 10-Day Forecast */}
        <Grid item xs={12} sm={6}>
          <Card style={{ height: '400px', position: 'relative' }}>
            <CardContent>
              <Typography variant="h5">10-Day Temperature Forecast</Typography>
              <IconButton 
                style={{ position: 'absolute', top: 16, right: 16, color: 'red' }} 
                onClick={() => handleHelpOpen(helpTexts.forecastChart)}
              >
                <HelpIcon />
              </IconButton>
              <Bar data={forecastChartData} options={{ responsive: true }} />
            </CardContent>
          </Card>
        </Grid>

        {/* Hourly Forecast Line Chart */}
        <Grid item xs={12} sm={6}>
          <Card style={{ height: '400px', position: 'relative' }}>
            <CardContent>
              <Typography variant="h5">Hourly Forecast</Typography>
              <IconButton 
                style={{ position: 'absolute', top: 16, right: 16, color: 'red' }} 
                onClick={() => handleHelpOpen(helpTexts.hourlyForecastChart)}
              >
                <HelpIcon />
              </IconButton>
              <Line data={hourlyForecastChartData} options={{ responsive: true }} />
            </CardContent>
          </Card>
        </Grid>

        {/* Bar Chart for Historical Weather Data */}
        <Grid item xs={12} sm={6}>
          <Card style={{ height: '400px', position: 'relative' }}>
            <CardContent>
              <Typography variant="h5">Historical Temperature Data</Typography>
              <IconButton 
                style={{ position: 'absolute', top: 16, right: 16, color: 'red' }} 
                onClick={() => handleHelpOpen(helpTexts.historicalChart)}
              >
                <HelpIcon />
              </IconButton>
              <Bar data={historicalChartData} options={{ responsive: true }} />
            </CardContent>
          </Card>
        </Grid>

        {/* Bar Chart of Crop Prices by State */}
        <Grid item xs={12} sm={6}>
          <Card style={{ height: '400px', position: 'relative' }}>
            <CardContent>
              <Typography variant="h5">Bar Chart of Crop Prices by State</Typography>
              <IconButton 
                style={{ position: 'absolute', top: 16, right: 16, color: 'red' }} 
                onClick={() => handleHelpOpen(helpTexts.cropPricesChart)}
              >
                <HelpIcon />
              </IconButton>
              <Bar data={barChartData} options={{ responsive: true }} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <JharkhandInfo />

    <>
      {/* Help Dialog */}
      <Dialog open={dialogOpen} onClose={handleHelpClose}>
        <DialogTitle>Help</DialogTitle>
        <DialogContent>
          <Card>
            <CardContent>
              {formatHelpText(currentHelpText)}
            </CardContent>
          </Card>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleHelpClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for feedback messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      
    </>
      
    </Container>
  );
};


export default WeatherDashboard;
