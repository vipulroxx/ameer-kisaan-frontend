import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
} from '@mui/material';

const ActionForm = ({ open, onClose, onSubmit, actionType }) => {
  const [formData, setFormData] = React.useState({
    seedType: '',
    plantingDepth: '',
    soilType: '',
    wateringSchedule: '',
    fertilizerType: '',
    sunlightRequirements: '',
    expectedHarvestTime: '',
    pestControlMeasures: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{`Submit ${actionType}`}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoFocus
              margin="dense"
              label="Seed Type"
              type="text"
              fullWidth
              variant="outlined"
              name="seedType"
              value={formData.seedType}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="dense"
              label="Planting Depth (cm)"
              type="number"
              fullWidth
              variant="outlined"
              name="plantingDepth"
              value={formData.plantingDepth}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="dense"
              label="Soil Type"
              type="text"
              fullWidth
              variant="outlined"
              name="soilType"
              value={formData.soilType}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="dense"
              label="Watering Schedule (days)"
              type="number"
              fullWidth
              variant="outlined"
              name="wateringSchedule"
              value={formData.wateringSchedule}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="dense"
              label="Fertilizer Type"
              type="text"
              fullWidth
              variant="outlined"
              name="fertilizerType"
              value={formData.fertilizerType}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="dense"
              label="Sunlight Requirements (hours)"
              type="number"
              fullWidth
              variant="outlined"
              name="sunlightRequirements"
              value={formData.sunlightRequirements}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="dense"
              label="Expected Harvest Time (days)"
              type="number"
              fullWidth
              variant="outlined"
              name="expectedHarvestTime"
              value={formData.expectedHarvestTime}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="dense"
              label="Pest Control Measures"
              type="text"
              fullWidth
              variant="outlined"
              name="pestControlMeasures"
              value={formData.pestControlMeasures}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Cancel</Button>
        <Button onClick={handleSubmit} color="primary">Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ActionForm;
