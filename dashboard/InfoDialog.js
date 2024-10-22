import React from 'react';
import { Dialog, Box, Typography, IconButton, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const InfoDialog = ({ open, onClose, title, steps, videoUrl }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <Box sx={{ padding: 2, bgcolor: '#f9f9f9', borderRadius: '8px' }}>
        <IconButton onClick={onClose} style={{ float: 'right' }}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" gutterBottom align="center">
          {title}
        </Typography>

        <Divider sx={{ marginY: 2 }} />

        <Typography variant="body1" align="center" gutterBottom>
          Follow these steps to understand how to use this component effectively.
        </Typography>

        <List>
          {steps.map((step, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={step} />
            </ListItem>
          ))}
        </List>

        {videoUrl && (
          <Box mt={2} display="flex" justifyContent="center">
            <iframe
              width="100%"
              height="315"
              src={videoUrl}
              title="Tutorial Video"
              frameBorder="0"
              allowFullScreen
            />
          </Box>
        )}
      </Box>
    </Dialog>
  );
};

export default InfoDialog;
