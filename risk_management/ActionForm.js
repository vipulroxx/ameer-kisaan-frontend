import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Typography
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
    pestControlMeasures: [],
  });

  const soilTypes = ['Clay', 'Sandy', 'Loamy', 'Peaty', 'Saline'];
  const pestControlOptions = ['Insecticide', 'Herbicide', 'Natural Predators', 'Traps'];

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        pestControlMeasures: checked
          ? [...prev.pestControlMeasures, value]
          : prev.pestControlMeasures.filter((measure) => measure !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: { backgroundColor: 'white' },
      }}
    >
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
            <FormControl fullWidth variant="outlined">
              <InputLabel>Soil Type</InputLabel>
              <Select
                name="soilType"
                value={formData.soilType}
                onChange={handleChange}
                label="Soil Type"
              >
                {soilTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
            <Typography variant="h6">Pest Control Measures:</Typography>
            <FormGroup>
              {pestControlOptions.map((option) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.pestControlMeasures.includes(option)}
                      onChange={handleChange}
                      name="pestControlMeasures"
                      value={option}
                    />
                  }
                  label={option}
                  key={option}
                />
              ))}
            </FormGroup>
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
