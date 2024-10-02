// Registration.js
import React, { useState } from 'react';
import { Button, TextField, Container, Typography } from '@mui/material';
import VoiceCommand from './VoiceCommand';

const Registration = () => {
  const [userData, setUserData] = useState({
    location: '',
    landSize: '',
    soilType: '',
    preferredCrops: ''
  });

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // Submit registration data
    console.log("User Data: ", userData);
  };

  return (
    <Container>
      <Typography variant="h5">Register</Typography>
      <TextField name="location" label="Location" fullWidth margin="normal" value={userData.location} onChange={handleInputChange} />
      <TextField name="landSize" label="Land Size" fullWidth margin="normal" value={userData.landSize} onChange={handleInputChange} />
      <TextField name="soilType" label="Soil Type" fullWidth margin="normal" value={userData.soilType} onChange={handleInputChange} />
      <TextField name="preferredCrops" label="Preferred Crops" fullWidth margin="normal" value={userData.preferredCrops} onChange={handleInputChange} />
      <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>

      {/* Voice Command for easier input */}
      <VoiceCommand />
    </Container>
  );
};

export default Registration;
