import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Dialog, List, ListItem, ListItemText, Grid, IconButton, TextField, Snackbar, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { ExpandMore, Close, Chat, Add } from '@mui/icons-material';
import { Bar, Pie, Line } from 'react-chartjs-2';

// Sample data for weather-related problems
const weatherIssuesData = [
  { title: "Drought Conditions", description: "Insufficient rainfall leading to crop failure.", stats: "Rainfall decreased by 40% this season" },
  { title: "Flooding", description: "Heavy rains causing crop and property damage.", stats: "Flooded area increased by 25%" },
  { title: "Pest Infestations", description: "Weather changes promoting pest growth.", stats: "Infestation reports up by 30%" },
  { title: "Temperature Extremes", description: "Unusual temperature fluctuations affecting growth cycles.", stats: "Temperatures exceeded average by 5°C" },
];

// Mock chart data
const chartData = {
  severity: {
    labels: ['Drought Conditions', 'Flooding', 'Pest Infestations', 'Temperature Extremes'],
    datasets: [{ label: 'Issue Severity', data: [25, 35, 20, 20], backgroundColor: ['#3f51b5', '#e91e63', '#ff9800', '#4caf50'] }]
  },
  impact: {
    labels: ['2020', '2021', '2022', '2023'],
    datasets: [{ label: 'Impact on Crop Yield', data: [80, 70, 60, 50], borderColor: '#3f51b5', fill: false }]
  }
};

const WeatherRelatedProblems = () => {
  const [expanded, setExpanded] = useState(null);
  const [openHelpChat, setOpenHelpChat] = useState(false);
  const [openRemediationDialog, setOpenRemediationDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [severity, setSeverity] = useState('success');
  const [savedData, setSavedData] = useState([]);
  const [newIssueData, setNewIssueData] = useState({ type: '', severity: '', description: '' });

  const handleExpandClick = (index) => setExpanded(expanded === index ? null : index);

  const toggleHelpChat = () => setOpenHelpChat(!openHelpChat);
  const toggleRemediationDialog = () => setOpenRemediationDialog(!openRemediationDialog);

  const handleSnackbarClose = () => setOpenSnackbar(false);

  const handleInputChange = (field, value) => setNewIssueData({ ...newIssueData, [field]: value });

  const saveData = () => {
    if (!newIssueData.type || !newIssueData.severity || !newIssueData.description) {
      setSeverity('warning');
      setSnackbarMessage('All fields are required!');
      setOpenSnackbar(true);
      return;
    }

    setSavedData([...savedData, newIssueData]);
    setNewIssueData({ type: '', severity: '', description: '' });
    setSeverity('success');
    setSnackbarMessage('Data saved successfully!');
    setOpenSnackbar(true);
    toggleRemediationDialog();
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>Weather Related Problems</Typography>

      {/* Cards Displaying Weather Related Problems */}
      <Grid container spacing={2}>
        {weatherIssuesData.map((issue, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">{issue.title}</Typography>
                <Typography variant="body2" color="text.secondary">{issue.description}</Typography>
                <Button size="small" onClick={() => handleExpandClick(index)} endIcon={<ExpandMore />}>View Details</Button>
                {expanded === index && (
                  <div style={{ marginTop: '10px' }}>
                    <Typography variant="body2">Stats: {issue.stats}</Typography>
                    <Typography variant="body2" color="text.primary">Suggested Actions</Typography>
                    <List dense>
                      {['Irrigation systems', 'Crop rotation strategies', 'Pest management programs', 'Weather forecasts and alerts'].map((suggestion, i) => (
                        <ListItem key={i}>
                          <ListItemText primary={suggestion} />
                        </ListItem>
                      ))}
                    </List>
                    <div style={{ marginTop: '10px' }}>
                      <Pie data={chartData.severity} />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Data Visualization */}
      <div style={{ marginTop: '20px' }}>
        <Typography variant="h6">Impact Trends</Typography>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Bar data={chartData.severity} />
          <Line data={chartData.impact} />
        </div>
      </div>

      {/* Add Weather Issue Data Button */}
      <Button variant="contained" color="secondary" startIcon={<Add />} style={{ marginTop: '20px' }} onClick={toggleRemediationDialog}>
        Add Weather Issue Data
      </Button>

      {/* Help Chat Button */}
      <Button variant="contained" color="primary" startIcon={<Chat />} style={{ marginTop: '20px', marginLeft: '10px' }} onClick={toggleHelpChat}>
        Get Help
      </Button>

      {/* Help Chat Popup */}
      <Dialog open={openHelpChat} onClose={toggleHelpChat}>
        <div style={{ padding: '20px', width: '300px' }}>
          <Typography variant="h6">Help Chat</Typography>
          <IconButton style={{ position: 'absolute', top: '10px', right: '10px' }} onClick={toggleHelpChat}><Close /></IconButton>
          <Typography variant="body2">Ask us anything about weather-related problems!</Typography>
        </div>
      </Dialog>

      {/* Remediation Dialog */}
      <Dialog open={openRemediationDialog} onClose={toggleRemediationDialog}>
        <div style={{ padding: '20px', width: '400px' }}>
          <Typography variant="h6">Add Weather Issue Data</Typography>
          <IconButton style={{ position: 'absolute', top: '10px', right: '10px' }} onClick={toggleRemediationDialog}><Close /></IconButton>
          <TextField label="Issue Type" fullWidth style={{ marginTop: '10px' }} value={newIssueData.type} onChange={(e) => handleInputChange('type', e.target.value)} />
          <TextField label="Severity" fullWidth style={{ marginTop: '10px' }} value={newIssueData.severity} onChange={(e) => handleInputChange('severity', e.target.value)} />
          <TextField label="Description" fullWidth multiline rows={3} style={{ marginTop: '10px' }} value={newIssueData.description} onChange={(e) => handleInputChange('description', e.target.value)} />
          <Button variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }} onClick={saveData}>Save Data</Button>
        </div>
      </Dialog>

      {/* Snackbar Notifications */}
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={severity} sx={{ width: '100%' }}>{snackbarMessage}</Alert>
      </Snackbar>

      {/* Table to Display Saved Data */}
      <div style={{ marginTop: '20px' }}>
        <Typography variant="h6">Saved Weather Issues Data</Typography>
        <TableContainer component={Paper} style={{ marginTop: '10px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Issue Type</TableCell>
                <TableCell>Severity</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {savedData.map((data, index) => (
                <TableRow key={index}>
                  <TableCell>{data.type}</TableCell>
                  <TableCell>{data.severity}</TableCell>
                  <TableCell>{data.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default WeatherRelatedProblems;
