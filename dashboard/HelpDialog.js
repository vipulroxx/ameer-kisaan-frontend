import React, { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Card,
  CardContent,
  Snackbar,
  Alert,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Chart, registerables } from 'chart.js'; // Import Chart and registerables
Chart.register(...registerables); // Register all core components

const HelpDialog = ({ dialogOpen, handleHelpClose }) => {
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  // Debugging: Check if props are being passed correctly
  useEffect(() => {
    console.log("HelpDialog: dialogOpen prop:", dialogOpen);
  }, [dialogOpen]); // Only log when dialogOpen changes

  return (
    <>
      <Dialog open={dialogOpen} onClose={handleHelpClose} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Crop Data Analysis Help</Typography>
            <IconButton onClick={handleHelpClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Understanding Crop Graphs
              </Typography>
              <Typography variant="body1">
                The graph for Ranchi shows three key metrics: Area, Production, and Crop Yield.
              </Typography>
              <Typography variant="body2" component="ul">
                <li>
                  <strong>Area</strong>: Represents the land area used for cultivation (in hectares).
                </li>
                <li>
                  <strong>Production</strong>: Indicates the total output of the crop (in tonnes).
                </li>
                <li>
                  <strong>Crop Yield</strong>: This is the efficiency of the crop production, calculated as the ratio of production to area (tonnes per hectare).
                </li>
              </Typography>
              <Typography variant="body1">
                Hover over the bars to see exact values.
              </Typography>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default HelpDialog;
