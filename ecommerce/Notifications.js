// Notifications.js
import React from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

const Notifications = () => {
  const notifications = [
    "Weather alert: Heavy rain expected tomorrow!",
    "Pest alert: Check your crops for aphids.",
    "New government scheme available for farmers."
  ];

  return (
    <Box sx={{ padding: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 2 }}>
      <Typography variant="h5">Notifications</Typography>
      <List>
        {notifications.map((notification, index) => (
          <ListItem key={index}>
            <ListItemText primary={notification} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Notifications;
