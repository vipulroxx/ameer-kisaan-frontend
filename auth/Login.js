import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Grid, Tooltip, IconButton } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Credentials: ", credentials);
    onLogin(credentials);
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>Login</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {[
            { name: 'email', label: 'Email', tooltip: 'Enter your registered email address' },
            { name: 'password', label: 'Password', tooltip: 'Enter your password' }
          ].map((field, index) => (
            <Grid item xs={12} key={index}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  name={field.name}
                  label={field.label}
                  type={field.name === 'password' ? 'password' : 'text'}
                  fullWidth
                  margin="normal"
                  value={credentials[field.name]}
                  onChange={handleInputChange}
                  required
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
            <Button variant="contained" color="primary" type="submit">Login</Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Login;
