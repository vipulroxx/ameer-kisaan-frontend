// ResourceLibrary.js
import React from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

const ResourceLibrary = () => {
  const resources = [
    { title: 'Organic Farming Basics', link: '#' },
    { title: 'Irrigation Techniques', link: '#' },
    { title: 'Pest Control Methods', link: '#' },
    { title: 'Harvesting Best Practices', link: '#' },
  ];

  return (
    <Box sx={{ padding: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 2 }}>
      <Typography variant="h5">Resource Library</Typography>
      <List>
        {resources.map((item, index) => (
          <ListItem key={index}>
            <ListItemText primary={<a href={item.link}>{item.title}</a>} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ResourceLibrary;
