import React, { useState } from 'react';
import {
  Button,
  TextField,
  Typography,
  Grid,
  Tooltip,
  IconButton,
  Box,
  CircularProgress,
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import JharkhandInfo from './JharkhandInfo';
const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Login Credentials: ", credentials);
    onLogin(credentials).finally(() => setLoading(false));
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ height: '100vh', p: 2 }}>
      <Box
        sx={{
          position: 'absolute',
          top: '0',
          width: '100%',
          maxWidth: 500,
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: '#ffffff',
        }}
      >
        <Typography variant="h5" gutterBottom align="center">Login</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {[
              { name: 'email', label: 'Email', tooltip: 'Enter your registered email address', icon: <EmailIcon /> },
              { name: 'password', label: 'Password', tooltip: 'Enter your password', icon: <LockIcon /> }
            ].map((field, index) => (
              <Grid item xs={12} key={index}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <TextField
                    name={field.name}
                    label={field.label}
                    type={field.name === 'password' ? 'password' : 'text'}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    value={credentials[field.name]}
                    onChange={handleInputChange}
                    required
                    InputProps={{
                      startAdornment: (
                        <IconButton>
                          {field.icon}
                        </IconButton>
                      ),
                      sx: {
                        '&:hover': {
                          borderColor: 'primary.main',
                        },
                        '&.Mui-focused': {
                          borderColor: 'primary.main',
                          boxShadow: '0 0 5px rgba(0, 0, 255, 0.5)',
                        },
                      },
                    }}
                  />
                  <Tooltip title={field.tooltip} arrow>
                    <IconButton size="small" sx={{ marginLeft: '8px' }}>
                      <HelpOutlineIcon fontSize="inherit" />
                    </IconButton>
                  </Tooltip>
                </div>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button 
                variant="contained" 
                color="primary" 
                type="submit" 
                fullWidth
                disabled={loading}
                sx={{
                  position: 'relative',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    transition: 'transform 0.2s ease-in-out',
                  },
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
              </Button>
            </Grid>
          </Grid>
        </form>
        <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
          <Button color="primary" onClick={() => {alert('Contact admin')}}>Forgot Password?</Button>
        </Typography>
        <Typography variant="body2" align="center">Login using</Typography>
        <Box display="flex" justifyContent="center" marginTop={1}>
          <IconButton sx={{ margin: 1, backgroundColor: '#f5f5f5', '&:hover': { backgroundColor: '#e0e0e0' } }}>
            <GoogleIcon />
          </IconButton>
          <IconButton sx={{ margin: 1, backgroundColor: '#f5f5f5', '&:hover': { backgroundColor: '#e0e0e0' } }}>
            <FacebookIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
