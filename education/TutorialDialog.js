import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const TutorialDialog = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Tutorial</DialogTitle>
      <DialogContent>
        <div>
          <h4>How to Use the App</h4>
          <p>1. Click on the Weather icon for updates.</p>
          <p>2. Select your desired crop from the Crop section.</p>
          <p>3. Use the Voice Command button to navigate.</p>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TutorialDialog;
