import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Paper,
} from '@mui/material';

const IssueRectification = ({ open, onClose, problems }) => {
  const getRectificationAction = (problem) => {
    switch (problem) {
      case "Planting depth is too shallow. Consider increasing it.":
        return "Increase planting depth to at least 5 cm.";
      case "Watering schedule is too infrequent. Consider watering more often.":
        return "Adjust watering schedule to every 3-5 days.";
      case "Soil type is not specified.":
        return "Test soil and specify the type for optimal growth.";
      case "Sunlight requirements are low. Ensure adequate sunlight.":
        return "Ensure crops receive at least 6 hours of sunlight.";
      default:
        return "Consult local agricultural guidelines for assistance.";
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Rectification Actions</DialogTitle>
      <DialogContent>
        <Paper style={{ padding: '20px', backgroundColor: '#f9f9f9' }}>
          <Typography variant="h6">Identified Issues:</Typography>
          <ul>
            {problems.map((problem, index) => (
              <li key={index}>
                <Typography variant="body2">{problem}</Typography>
                <Typography variant="body2" color="primary">{getRectificationAction(problem)}</Typography>
              </li>
            ))}
          </ul>
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default IssueRectification;
