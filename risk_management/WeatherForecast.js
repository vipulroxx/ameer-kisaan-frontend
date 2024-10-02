// WeatherForecast.js
import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

const WeatherForecast = ({ latitude, longitude }) => {
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
        );
        setForecast(response.data.daily.temperature_2m_max.slice(0, 5)); // 5-day forecast
      } catch (error) {
        console.error('Error fetching weather forecast data', error);
      }
    };
    fetchWeather();
  }, [latitude, longitude]);

  return (
    <Box sx={{ padding: 2, backgroundColor: '#fff', borderRadius: 2, boxShadow: 2, marginTop: 2 }}>
      <Typography variant="h6">5-Day Forecast</Typography>
      <List>
        {forecast.map((temp, index) => (
          <ListItem key={index}>
            <ListItemText primary={`Day ${index + 1}: Max Temp: ${Math.round(temp)}°C`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default WeatherForecast;
