import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Paper,
} from '@mui/material';
import IssueRectification from './IssueRectification'; // Import the new component

const ReportDialog = ({ open, onClose, data }) => {
  const [showRectification, setShowRectification] = useState(false);

  if (!data) {
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>No Data Available</DialogTitle>
        <DialogContent>
          <Typography variant="body1">No analysis data was provided.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    );
  }

  const {
    seedType,
    plantingDepth,
    soilType,
    wateringSchedule,
    fertilizerType,
    sunlightRequirements,
    expectedHarvestTime,
    pestControlMeasures=[],
  } = data;

  // Problem detection logic
  const problems = [];
  if (plantingDepth < 5) problems.push("Planting depth is too shallow. Consider increasing it.");
  if (wateringSchedule > 7) problems.push("Watering schedule is too infrequent. Consider watering more often.");
  if (!soilType) problems.push("Soil type is not specified.");
  if (sunlightRequirements < 6) problems.push("Sunlight requirements are low. Ensure adequate sunlight.");

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Analysis Report</DialogTitle>
        <DialogContent>
          <Paper style={{ padding: '20px', backgroundColor: '#f9f9f9' }}>
            <Typography variant="h6">Submitted Data:</Typography>
            <Typography><strong>Seed Type:</strong> {seedType}</Typography>
            <Typography><strong>Planting Depth:</strong> {plantingDepth} cm</Typography>
            <Typography><strong>Soil Type:</strong> {soilType}</Typography>
            <Typography><strong>Watering Schedule:</strong> {wateringSchedule} days</Typography>
            <Typography><strong>Fertilizer Type:</strong> {fertilizerType}</Typography>
            <Typography><strong>Sunlight Requirements:</strong> {sunlightRequirements} hours</Typography>
            <Typography><strong>Expected Harvest Time:</strong> {expectedHarvestTime} days</Typography>
            <Typography><strong>Pest Control Measures:</strong> {pestControlMeasures.join(', ') || 'None'}</Typography>
            
            {problems.length > 0 && (
              <div style={{ marginTop: '20px' }}>
                <Typography variant="h6" color="error">Detected Issues:</Typography>
                <ul>
                  {problems.map((problem, index) => (
                    <li key={index}>
                      <Typography variant="body2">{problem}</Typography>
                    </li>
                  ))}
                </ul>
                <Button variant="outlined" color="warning" onClick={() => setShowRectification(true)}>
                  View Rectification Actions
                </Button>
              </div>
            )}
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>

      <IssueRectification
        open={showRectification}
        onClose={() => setShowRectification(false)}
        problems={problems}
      />
    </>
  );
};

export default ReportDialog;
