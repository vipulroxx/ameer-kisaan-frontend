import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Grid, Tooltip, IconButton, MenuItem, Autocomplete } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';


const Registration = ({ onRegister, error, toggleForm }) => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    aadharId: '',
    panCardNumber: '',
    farmId: '',
    preferredCrops: [],
    userType: 'Farmer',
  });

  const [fieldErrors, setFieldErrors] = useState({});

  const cropOptions = [
    "Wheat", "Rice", "Maize", "Barley", "Cotton", "Sugarcane", "Soybean", "Mustard", "Groundnut",
    "Pigeon Pea", "Chickpea", "Lentil", "Potato", "Tomato", "Onion", "Chilli", "Banana", "Papaya",
    "Mango", "Apple", "Grapes", "Pomegranate", "Guava", "Coconut", "Coffee", "Tea"
  ];

  // Regex patterns (no continuous values like 12345 or ABCDE1234F)
  const regexPatterns = {
    aadharId: /^(?!.*(\d)\1{3})\d{4}-\d{4}-\d{4}$/, // No 4 repeated digits in a row
    panCardNumber: /^(?!.*(ABCDE|1234))[A-Z]{5}[0-9]{4}[A-Z]{1}$/, // No ABCDE or 1234
    farmId: /^(?!.*(123456|ABCDEF))[A-Z]{0,4}\d{6,12}$/ // No 123456 or ABCDEF
  };

  const tooltips = {
    aadharId: "12 digits, grouped as XXXX-XXXX-XXXX. Example: 1234-5678-9087. Avoid repeating digits.",
    panCardNumber: "10 chars: 5 uppercase letters, 4 digits, 1 uppercase letter. Example: ABCDE1234F. Avoid ABCDE1234F.",
    farmId: "6-12 digits, optionally prefixed by up to 4 uppercase letters. Example: FARM123456 or 3252626. Avoid 123456 or ABCDEF."
  };

  const defaultValues = {
    aadharId: "1234-5678-9087",
    panCardNumber: "ABCDE1234F",
    farmId: "FARM239655"
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });

    // Validate on change
    if (regexPatterns[name]) {
      if (!regexPatterns[name].test(value)) {
        setFieldErrors((prev) => ({ ...prev, [name]: true }));
      } else {
        setFieldErrors((prev) => ({ ...prev, [name]: false }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = {};
    // Validate all regex fields before submit
    Object.keys(regexPatterns).forEach((field) => {
      if (!regexPatterns[field].test(userData[field])) {
        errors[field] = true;
      }
    });
    setFieldErrors(errors);
    if (Object.keys(errors).length === 0) {
      onRegister(userData);
    }
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>Register as a Farmer or Home Gardener</Typography>
      {error && (
        <Typography color="error" align="center" sx={{ mb: 1 }}>{error}</Typography>
      )}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Username */}
          <Grid item xs={12}>
            <TextField
              name="username"
              label="Username"
              fullWidth
              margin="normal"
              value={userData.username}
              onChange={handleInputChange}
              required
            />
          </Grid>
          {/* Email */}
          <Grid item xs={12}>
            <TextField
              name="email"
              label="Email"
              fullWidth
              margin="normal"
              value={userData.email}
              onChange={handleInputChange}
              required
              type="email"
            />
          </Grid>
          {/* Phone Number */}
          <Grid item xs={12}>
            <TextField
              name="phoneNumber"
              label="Phone Number"
              fullWidth
              margin="normal"
              value={userData.phoneNumber}
              onChange={handleInputChange}
              required
              type="tel"
            />
          </Grid>
          {/* Password */}
          <Grid item xs={12}>
            <TextField
              name="password"
              label="Password"
              fullWidth
              margin="normal"
              value={userData.password}
              onChange={handleInputChange}
              required
              type="password"
            />
          </Grid>
          {/* Aadhar ID */}
          <Grid item xs={12}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                name="aadharId"
                label="Aadhar Card ID"
                value={userData.aadharId}
                onChange={handleInputChange}
                helperText={
                  fieldErrors.aadharId
                    ? "Invalid format or repeated digits. Example: 1234-5678-9087"
                    : "Format: XXXX-XXXX-XXXX (e.g., 1234-5678-9087)"
                }
                error={!!fieldErrors.aadharId}
                inputProps={{ pattern: "^(?!.*(\\d)\\1{3})\\d{4}-\\d{4}-\\d{4}$", defaultValue: defaultValues.aadharId }}
                required
                fullWidth
                margin="normal"
              />
              <Tooltip title={tooltips.aadharId} arrow>
                <IconButton size="small" style={{ marginLeft: '8px' }}>
                  <HelpOutlineIcon fontSize="inherit" />
                </IconButton>
              </Tooltip>
            </div>
          </Grid>
          {/* PAN Card Number */}
          <Grid item xs={12}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                name="panCardNumber"
                label="PAN Card Number"
                value={userData.panCardNumber}
                onChange={handleInputChange}
                helperText={
                  fieldErrors.panCardNumber
                    ? "Invalid format or sequence. Example: ABCDE1234F"
                    : "Format: AAAAA9999A (e.g., ABCDE1234F)"
                }
                error={!!fieldErrors.panCardNumber}
                inputProps={{ pattern: "^(?!.*(ABCDE|1234))[A-Z]{5}[0-9]{4}[A-Z]{1}$", defaultValue: defaultValues.panCardNumber }}
                required
                fullWidth
                margin="normal"
              />
              <Tooltip title={tooltips.panCardNumber} arrow>
                <IconButton size="small" style={{ marginLeft: '8px' }}>
                  <HelpOutlineIcon fontSize="inherit" />
                </IconButton>
              </Tooltip>
            </div>
          </Grid>
          {/* Registered Farm ID */}
          <Grid item xs={12}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                name="farmId"
                label="Registered Farm ID"
                value={userData.farmId}
                onChange={handleInputChange}
                helperText={
                  fieldErrors.farmId
                    ? "Invalid format or sequence. Example: FARM239655"
                    : "Format: FARM123456 or 3252626"
                }
                error={!!fieldErrors.farmId}
                inputProps={{ pattern: "^(?!.*(123456|ABCDEF))[A-Z]{0,4}\\d{6,12}$", defaultValue: defaultValues.farmId }}
                required
                fullWidth
                margin="normal"
              />
              <Tooltip title={tooltips.farmId} arrow>
                <IconButton size="small" style={{ marginLeft: '8px' }}>
                  <HelpOutlineIcon fontSize="inherit" />
                </IconButton>
              </Tooltip>
            </div>
          </Grid>
          {/* Preferred Crops */}
          <Grid item xs={12}>
            <Autocomplete
              multiple
              options={cropOptions}
              value={userData.preferredCrops}
              onChange={(event, newValue) => setUserData({ ...userData, preferredCrops: newValue })}
              renderInput={(params) => (
                <TextField {...params} label="Preferred Crops" helperText="Select one or more crops" />
              )}
            />
          </Grid>
          {/* User Type */}
          <Grid item xs={12}>
            <TextField
              select
              name="userType"
              label="User Type"
              value={userData.userType}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              required
            >
              <MenuItem value="Farmer">Farmer</MenuItem>
              <MenuItem value="Home Gardener">Home Gardener</MenuItem>
            </TextField>
          </Grid>
          {/* Submit */}
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">Submit</Button>
          </Grid>
          {/* Toggle to Login */}
          <Grid item xs={12}>
            <Typography variant="body2" align="center">
              Already have an account?{' '}
              <Button color="secondary" onClick={toggleForm}>Login</Button>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Registration;
