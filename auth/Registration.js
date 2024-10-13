import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Grid, Tooltip, IconButton } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const Registration = ({ onRegister }) => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    aadharId: '',
    panCardNumber: '',
    farmId: '',
    preferredCrops: ''
  });

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Data: ", userData);
    onRegister(userData);
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>Register as a Farmer</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {[
            { name: 'username', label: 'Username', tooltip: 'Enter your desired username' },
            { name: 'email', label: 'Email', tooltip: 'Enter a valid email address' },
            { name: 'phoneNumber', label: 'Phone Number', tooltip: 'Enter your phone number' },
            { name: 'password', label: 'Password', tooltip: 'Create a strong password' },
            { name: 'aadharId', label: 'Aadhar Card ID', tooltip: 'Enter your Aadhar Card ID' },
            { name: 'panCardNumber', label: 'PAN Card Number', tooltip: 'Enter your PAN Card number' },
            { name: 'farmId', label: 'Registered Farm ID', tooltip: 'Enter your registered farm ID' },
            { name: 'preferredCrops', label: 'Preferred Crops', tooltip: 'List your preferred crops' }
          ].map((field, index) => (
            <Grid item xs={12} key={index}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  name={field.name}
                  label={field.label}
                  fullWidth
                  margin="normal"
                  value={userData[field.name]}
                  onChange={handleInputChange}
                  required={field.name !== 'preferredCrops'} // Make preferredCrops optional
                />
                <Tooltip title={field.tooltip} arrow>
                  <IconButton size="small" style={{ marginLeft: '8px' }}>
                    <HelpOutlineIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
              </div>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">Submit</Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Registration;
