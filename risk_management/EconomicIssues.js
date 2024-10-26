import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Dialog, List, ListItem, ListItemText, Grid, IconButton, TextField, Snackbar, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { ExpandMore, Close, Chat, Add } from '@mui/icons-material';
import { Bar, Pie, Line } from 'react-chartjs-2';

const economicIssuesData = [
  { title: "Loan Burden", description: "High interest rates affecting small farmers.", stats: "Avg. 20% interest rate" },
  { title: "Crop Prices", description: "Market fluctuations impact farmer income.", stats: "Price decreased by 15% this year" },
  { title: "Market Access", description: "Limited access to profitable markets.", stats: "Distance from markets: 20km" },
  { title: "Weather Damage", description: "Seasonal monsoons damage crops.", stats: "High risk of loss due to rains" },
];

// Mock chart data
const chartData = {
  severity: {
    labels: ['Loan Burden', 'Crop Prices', 'Market Access', 'Weather Damage'],
    datasets: [{ label: 'Issue Severity', data: [20, 15, 30, 25], backgroundColor: ['#3f51b5', '#e91e63', '#ff9800', '#4caf50'] }]
  },
  income: {
    labels: ['2020', '2021', '2022', '2023'],
    datasets: [{ label: 'Average Income', data: [10000, 12000, 9000, 13000], borderColor: '#3f51b5', fill: false }]
  }
};

const EconomicIssues = () => {
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
      <Typography variant="h4" gutterBottom>Economic Issues</Typography>

      {/* Cards Displaying Economic Issues */}
      <Grid container spacing={2}>
        {economicIssuesData.map((issue, index) => (
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
                      {['Apply for subsidies', 'Join a cooperative', 'Check online platforms', 'Seek insurance options'].map((suggestion, i) => (
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
        <Typography variant="h6">Economic Trends</Typography>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Bar data={chartData.severity} />
          <Line data={chartData.income} />
        </div>
      </div>

      {/* Add Economic Issue Data Button */}
      <Button variant="contained" color="secondary" startIcon={<Add />} style={{ marginTop: '20px' }} onClick={toggleRemediationDialog}>
        Add Economic Issue Data
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
          <Typography variant="body2">Ask us anything about economic issues!</Typography>
        </div>
      </Dialog>

      {/* Remediation Dialog */}
      <Dialog open={openRemediationDialog} onClose={toggleRemediationDialog}>
        <div style={{ padding: '20px', width: '400px' }}>
          <Typography variant="h6">Add Economic Issue Data</Typography>
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
        <Typography variant="h6">Saved Economic Issues Data</Typography>
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

export default EconomicIssues;
