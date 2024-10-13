import React from 'react';
import { Container, Typography, Grid, Tooltip, IconButton } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Profile = ({ userDetails }) => {
  // Check if userDetails is available and provide default values if not
  const username = userDetails?.username || 'N/A';
  const email = userDetails?.email || 'N/A';
  const phoneNumber = userDetails?.phoneNumber || 'N/A';
  const aadharId = userDetails?.aadharId || 'N/A';
  const panCardNumber = userDetails?.panCardNumber || 'N/A';
  const farmId = userDetails?.farmId || 'N/A';
  const preferredCrops = userDetails?.preferredCrops || 'N/A';

  return (
    <Container>
      <Typography variant="h5" gutterBottom>User Profile</Typography>
      <Grid container spacing={2}>
        {[
          { label: 'Username', value: username, tooltip: 'Your chosen username', icon: <AccountCircleIcon style={{ color: 'red', fontSize: '40px' }} /> },
          { label: 'Email', value: email, tooltip: 'Your email address' },
          { label: 'Phone Number', value: phoneNumber, tooltip: 'Your phone contact' },
          { label: 'Aadhar ID', value: aadharId, tooltip: 'Your Aadhar Card ID' },
          { label: 'PAN Card Number', value: panCardNumber, tooltip: 'Your PAN Card number' },
          { label: 'Registered Farm ID', value: farmId, tooltip: 'Your registered farm ID' },
          { label: 'Preferred Crops', value: preferredCrops, tooltip: 'Crops you prefer to grow' }
        ].map((field, index) => (
          <Grid item xs={12} key={index}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {field.icon && <div style={{ marginRight: '8px' }}>{field.icon}</div>}
              <Typography variant="body1" style={{ flexGrow: 1, fontWeight: 'bold', color: field.label === 'Username' ? 'red' : 'inherit' }}>
                {field.label}: {field.value}
              </Typography>
              <Tooltip title={field.tooltip} arrow>
                <IconButton size="small" style={{ marginLeft: '8px' }}>
                  <HelpOutlineIcon fontSize="inherit" />
                </IconButton>
              </Tooltip>
            </div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Profile;
