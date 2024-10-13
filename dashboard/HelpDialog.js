import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Card,
  CardContent,
  Snackbar,
} from '@mui/material';
import { Alert } from '@mui/material';

const HelpDialog = ({ dialogOpen, handleHelpClose }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleNotUnderstood = () => {
    console.log("Not Understood");
    setSnackbarMessage("Contact admin: ameerkissan@ameerkissan.com");
    setSnackbarOpen(true);
  };

  const handleUnderstood = () => {
    console.log("Understood");
    setSnackbarMessage("Ok! Great");
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Dialog open={dialogOpen} onClose={handleHelpClose}>
        <DialogTitle>Help</DialogTitle>
        <DialogContent>
          <Card>
            <CardContent>
              <Typography variant="body1">
                I’m here to help! Could you please provide more details about your request?
              </Typography>
            </CardContent>
          </Card>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNotUnderstood} color="primary">Not Understood</Button>
          <Button onClick={handleUnderstood} color="primary">Understood</Button>
          <Button onClick={handleHelpClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for feedback messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default HelpDialog;
