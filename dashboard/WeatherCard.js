import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from '@mui/material';
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
import {
  FaThermometerHalf,
  FaWind,
  FaTint,
  FaCloudRain,
  FaSun,
  FaUmbrella,
  FaCloudSunRain,
  FaLocationArrow,
  FaSeedling,
  FaRadiation,
} from 'react-icons/fa';

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

// Sample agricultural commodity data
const data = [
  // Andaman and Nicobar
  { state: 'Andaman and Nicobar', commodity: 'Amaranthus', minPrice: 6000, maxPrice: 8000 },
  { state: 'Andaman and Nicobar', commodity: 'Banana - Green', minPrice: 4500, maxPrice: 5500 },
  { state: 'Andaman and Nicobar', commodity: 'Black Pepper', minPrice: 110000, maxPrice: 130000 },

  // Andhra Pradesh
  { state: 'Andhra Pradesh', commodity: 'Tomato', minPrice: 200, maxPrice: 1120 },
  { state: 'Andhra Pradesh', commodity: 'Bengal Gram', minPrice: 4500, maxPrice: 4700 },
  { state: 'Andhra Pradesh', commodity: 'Jowar', minPrice: 1800, maxPrice: 1950 },

  // Assam
  { state: 'Assam', commodity: 'Lentil', minPrice: 5200, maxPrice: 7200 },
  { state: 'Assam', commodity: 'Rice', minPrice: 2200, maxPrice: 2500 },
  { state: 'Assam', commodity: 'Mustard Seeds', minPrice: 5000, maxPrice: 6000 },

  // Bihar
  { state: 'Bihar', commodity: 'Potato', minPrice: 2000, maxPrice: 3000 },
  { state: 'Bihar', commodity: 'Cauliflower', minPrice: 3000, maxPrice: 4000 },
  { state: 'Bihar', commodity: 'Onion', minPrice: 2500, maxPrice: 3500 },

  // Chhattisgarh
  { state: 'Chhattisgarh', commodity: 'Rice', minPrice: 2000, maxPrice: 2500 },
  { state: 'Chhattisgarh', commodity: 'Soybean', minPrice: 3500, maxPrice: 4500 },
  { state: 'Chhattisgarh', commodity: 'Pigeon Pea', minPrice: 4000, maxPrice: 5000 },

  // Goa
  { state: 'Goa', commodity: 'Coconut', minPrice: 4000, maxPrice: 5000 },
  { state: 'Goa', commodity: 'Pineapple', minPrice: 3000, maxPrice: 4000 },
  { state: 'Goa', commodity: 'Tomato', minPrice: 2500, maxPrice: 3500 },

  // Gujarat
  { state: 'Gujarat', commodity: 'Cotton', minPrice: 4000, maxPrice: 5000 },
  { state: 'Gujarat', commodity: 'Groundnut', minPrice: 3000, maxPrice: 4000 },
  { state: 'Gujarat', commodity: 'Wheat', minPrice: 2000, maxPrice: 3000 },

  // Haryana
  { state: 'Haryana', commodity: 'Wheat', minPrice: 1800, maxPrice: 2200 },
  { state: 'Haryana', commodity: 'Rice', minPrice: 2000, maxPrice: 2400 },
  { state: 'Haryana', commodity: 'Mustard', minPrice: 4000, maxPrice: 4800 },

  // Himachal Pradesh
  { state: 'Himachal Pradesh', commodity: 'Apple', minPrice: 8000, maxPrice: 12000 },
  { state: 'Himachal Pradesh', commodity: 'Peach', minPrice: 6000, maxPrice: 8000 },
  { state: 'Himachal Pradesh', commodity: 'Plum', minPrice: 5000, maxPrice: 7000 },

  // Jharkhand
  { state: 'Jharkhand', commodity: 'Rice', minPrice: 2000, maxPrice: 2500 },
  { state: 'Jharkhand', commodity: 'Pulses', minPrice: 3500, maxPrice: 4500 },
  { state: 'Jharkhand', commodity: 'Potato', minPrice: 1500, maxPrice: 2000 },

  // Karnataka
  { state: 'Karnataka', commodity: 'Coffee', minPrice: 5000, maxPrice: 6000 },
  { state: 'Karnataka', commodity: 'Rice', minPrice: 2200, maxPrice: 2600 },
  { state: 'Karnataka', commodity: 'Onion', minPrice: 3000, maxPrice: 3500 },

  // Kerala
  { state: 'Kerala', commodity: 'Coconut', minPrice: 3000, maxPrice: 4000 },
  { state: 'Kerala', commodity: 'Banana', minPrice: 5000, maxPrice: 6000 },
  { state: 'Kerala', commodity: 'Tea', minPrice: 7000, maxPrice: 9000 },

  // Madhya Pradesh
  { state: 'Madhya Pradesh', commodity: 'Wheat', minPrice: 1500, maxPrice: 2000 },
  { state: 'Madhya Pradesh', commodity: 'Rice', minPrice: 1800, maxPrice: 2200 },
  { state: 'Madhya Pradesh', commodity: 'Pulses', minPrice: 4000, maxPrice: 5000 },

  // Maharashtra
  { state: 'Maharashtra', commodity: 'Sugarcane', minPrice: 2500, maxPrice: 3000 },
  { state: 'Maharashtra', commodity: 'Cotton', minPrice: 3000, maxPrice: 3500 },
  { state: 'Maharashtra', commodity: 'Turmeric', minPrice: 6000, maxPrice: 8000 },

  // Manipur
  { state: 'Manipur', commodity: 'Rice', minPrice: 3000, maxPrice: 3500 },
  { state: 'Manipur', commodity: 'Chili', minPrice: 4000, maxPrice: 5000 },
  { state: 'Manipur', commodity: 'Potato', minPrice: 2000, maxPrice: 2500 },

  // Meghalaya
  { state: 'Meghalaya', commodity: 'Rice', minPrice: 2500, maxPrice: 3000 },
  { state: 'Meghalaya', commodity: 'Potato', minPrice: 1500, maxPrice: 2000 },
  { state: 'Meghalaya', commodity: 'Pineapple', minPrice: 3000, maxPrice: 4000 },

  // Mizoram
  { state: 'Mizoram', commodity: 'Rice', minPrice: 2000, maxPrice: 3000 },
  { state: 'Mizoram', commodity: 'Chili', minPrice: 4000, maxPrice: 5000 },
  { state: 'Mizoram', commodity: 'Cabbage', minPrice: 1500, maxPrice: 2000 },

  // Nagaland
  { state: 'Nagaland', commodity: 'Rice', minPrice: 3000, maxPrice: 3500 },
  { state: 'Nagaland', commodity: 'Chili', minPrice: 4000, maxPrice: 5000 },
  { state: 'Nagaland', commodity: 'Potato', minPrice: 2000, maxPrice: 2500 },

  // Odisha
  { state: 'Odisha', commodity: 'Rice', minPrice: 1800, maxPrice: 2200 },
  { state: 'Odisha', commodity: 'Pulses', minPrice: 3500, maxPrice: 4500 },
  { state: 'Odisha', commodity: 'Mustard', minPrice: 4000, maxPrice: 4800 },

  // Punjab
  { state: 'Punjab', commodity: 'Wheat', minPrice: 1600, maxPrice: 2000 },
  { state: 'Punjab', commodity: 'Rice', minPrice: 2200, maxPrice: 2600 },
  { state: 'Punjab', commodity: 'Barley', minPrice: 1200, maxPrice: 1500 },

  // Rajasthan
  { state: 'Rajasthan', commodity: 'Wheat', minPrice: 1500, maxPrice: 2000 },
  { state: 'Rajasthan', commodity: 'Mustard', minPrice: 4000, maxPrice: 5000 },
  { state: 'Rajasthan', commodity: 'Coriander', minPrice: 5000, maxPrice: 6000 },

  // Sikkim
  { state: 'Sikkim', commodity: 'Potato', minPrice: 2500, maxPrice: 3000 },
  { state: 'Sikkim', commodity: 'Green Tea', minPrice: 5000, maxPrice: 6000 },
  { state: 'Sikkim', commodity: 'Chili', minPrice: 4000, maxPrice: 5000 },

  // Tamil Nadu
  { state: 'Tamil Nadu', commodity: 'Rice', minPrice: 2200, maxPrice: 2600 },
  { state: 'Tamil Nadu', commodity: 'Banana', minPrice: 3000, maxPrice: 4000 },
  { state: 'Tamil Nadu', commodity: 'Chili', minPrice: 4000, maxPrice: 5000 },

  // Telangana
  { state: 'Telangana', commodity: 'Rice', minPrice: 2000, maxPrice: 2400 },
  { state: 'Telangana', commodity: 'Chili', minPrice: 4000, maxPrice: 5000 },
  { state: 'Telangana', commodity: 'Cotton', minPrice: 3000, maxPrice: 3500 },

  // Tripura
  { state: 'Tripura', commodity: 'Rice', minPrice: 2500, maxPrice: 3000 },
  { state: 'Tripura', commodity: 'Pulses', minPrice: 3000, maxPrice: 4000 },
  { state: 'Tripura', commodity: 'Vegetables', minPrice: 1500, maxPrice: 2000 },

  // Uttarakhand
  { state: 'Uttarakhand', commodity: 'Potato', minPrice: 2500, maxPrice: 3000 },
  { state: 'Uttarakhand', commodity: 'Apple', minPrice: 8000, maxPrice: 12000 },
  { state: 'Uttarakhand', commodity: 'Green Peas', minPrice: 3000, maxPrice: 4000 },

  // Uttar Pradesh
  { state: 'Uttar Pradesh', commodity: 'Sugarcane', minPrice: 2500, maxPrice: 3000 },
  { state: 'Uttar Pradesh', commodity: 'Wheat', minPrice: 1600, maxPrice: 2000 },
  { state: 'Uttar Pradesh', commodity: 'Rice', minPrice: 2200, maxPrice: 2600 },

  // West Bengal
  { state: 'West Bengal', commodity: 'Rice', minPrice: 2200, maxPrice: 2500 },
  { state: 'West Bengal', commodity: 'Potato', minPrice: 1500, maxPrice: 2000 },
  { state: 'West Bengal', commodity: 'Jute', minPrice: 3000, maxPrice: 3500 },
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

const WeatherDashboard = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [historicalData, setHistoricalData] = useState([]);
  const [forecastData, setForecastData] = useState([]);

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

  const getColorByPrice = (price) => {
    if (price < 3000) return 'rgba(255, 99, 132, 0.6)';  // Red for low prices
    if (price < 6000) return 'rgba(255, 206, 86, 0.6)'; // Yellow for mid-low prices
    if (price < 9000) return 'rgba(54, 162, 235, 0.6)';  // Blue for mid-high prices
    return 'rgba(75, 192, 192, 0.6)';                     // Green for high prices
  };


  // Function to fetch weather data
  const fetchWeatherData = async () => {
    const latitude = 22.8046;
    const longitude = 86.2029;

    try {
      // Fetch current and hourly weather
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation`);
      const result = await response.json();
      setCurrentWeather(result.current);
      setHourlyForecast(result.hourly);

      // Fetch historical weather data for the last 10 days
      const historicalResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&past_days=10&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`);
      const historicalResult = await historicalResponse.json();
      setHistoricalData(historicalResult.hourly);

      // Fetch daily forecast data
      const forecastResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min`);
      const forecastResult = await forecastResponse.json();
      setForecastData(forecastResult.daily);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  // Pie chart data for average prices
  const pieChartData = {
    labels: cropPrices.map(item => item.commodity),
    datasets: [
      {
        label: 'Average Prices',
        data: cropPrices.map(item => item.avgPrice),
        backgroundColor: cropPrices.map(item => cropColors[item.commodity] || 'rgba(200, 200, 200, 0.6)'),
      },
    ],
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
          <Card style={{ height: '600px' }}>
            <CardContent>
              <Typography variant="h5">Pie Chart of Average Prices</Typography>
              <Pie data={pieChartData} options={{ responsive: true }} />
            </CardContent>
          </Card>
        </Grid>

        {/* Bar Chart for 10-Day Forecast */}
        <Grid item xs={12} sm={6}>
          <Card style={{ height: '400px' }}>
            <CardContent>
              <Typography variant="h5">10-Day Temperature Forecast</Typography>
              <Bar data={forecastChartData} options={{ responsive: true }} />
            </CardContent>
          </Card>
        </Grid>

        {/* Hourly Forecast Line Chart */}
        <Grid item xs={12} sm={6}>
          <Card style={{ height: '400px' }}>
            <CardContent>
              <Typography variant="h5">Hourly Forecast</Typography>
              <Line data={hourlyForecastChartData} options={{ responsive: true }} />
            </CardContent>
          </Card>
        </Grid>

        {/* Bar Chart for Historical Weather Data */}
        <Grid item xs={12} sm={6}>
          <Card style={{ height: '400px' }}>
            <CardContent>
              <Typography variant="h5">Historical Temperature Data</Typography>
              <Bar data={historicalChartData} options={{ responsive: true }} />
            </CardContent>
          </Card>
        </Grid>

        {/* Bar Chart of Crop Prices by State */}
        <Grid item xs={12} sm={6}>
          <Card style={{ height: '400px' }}>
            <CardContent>
              <Typography variant="h5">Bar Chart of Crop Prices by State</Typography>
              <Bar data={barChartData} options={{ responsive: true }} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};


export default WeatherDashboard;
