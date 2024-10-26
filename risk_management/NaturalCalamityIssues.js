import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  List,
  ListItem,
  ListItemText,
  Grid,
  IconButton,
  TextField,
  Snackbar,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { ExpandMore, Close, Chat, Add } from '@mui/icons-material';
import { Bar, Pie, Line } from 'react-chartjs-2';

// Sample data for natural calamity issues
const calamityIssuesData = [
  { title: "Drought", description: "Insufficient rainfall leading to water scarcity.", stats: "50% of farmers report crop loss due to drought" },
  { title: "Flood", description: "Excess rainfall causing inundation of fields.", stats: "40% of farmers face losses due to floods" },
  { title: "Cyclones", description: "High winds and rains that can destroy crops.", stats: "25% of regions affected by cyclones" },
  { title: "Earthquakes", description: "Can cause damage to infrastructure affecting farming.", stats: "15% of farmers report issues due to earthquakes" },
];

// Mock chart data for natural calamity issues
const calamityChartData = {
  severity: {
    labels: ['Drought', 'Flood', 'Cyclones', 'Earthquakes'],
    datasets: [
      {
        label: 'Issue Severity',
        data: [40, 30, 20, 10],
        backgroundColor: ['#3f51b5', '#e91e63', '#ff9800', '#4caf50'],
      },
    ],
  },
  impact: {
    labels: ['2020', '2021', '2022', '2023'],
    datasets: [
      {
        label: 'Impact on Farmers',
        data: [70, 60, 55, 50],
        borderColor: '#3f51b5',
        fill: false,
      },
    ],
  },
};

const NaturalCalamityIssues = () => {
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
      <Typography variant="h4" gutterBottom>Natural Calamity Issues</Typography>

      {/* Cards Displaying Natural Calamity Issues */}
      <Grid container spacing={2}>
        {calamityIssuesData.map((issue, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">{issue.title}</Typography>
                <Typography variant="body2" color="text.secondary">{issue.description}</Typography>
                <Button size="small" onClick={() => handleExpandClick(index)} endIcon={<ExpandMore />}>
                  View Details
                </Button>
                {expanded === index && (
                  <div style={{ marginTop: '10px' }}>
                    <Typography variant="body2">Stats: {issue.stats}</Typography>
                    <Typography variant="body2" color="text.primary">Suggested Actions</Typography>
                    <List dense>
                      {['Crop insurance', 'Government relief programs', 'Community support', 'Emergency response plans'].map((suggestion, i) => (
                        <ListItem key={i}>
                          <ListItemText primary={suggestion} />
                        </ListItem>
                      ))}
                    </List>
                    <div style={{ marginTop: '10px' }}>
                      <Pie data={calamityChartData.severity} />
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
          <Bar data={calamityChartData.severity} />
          <Line data={calamityChartData.impact} />
        </div>
      </div>

      {/* Add Natural Calamity Data Button */}
      <Button variant="contained" color="secondary" startIcon={<Add />} style={{ marginTop: '20px' }} onClick={toggleRemediationDialog}>
        Add Natural Calamity Data
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
          <Typography variant="body2">Ask us anything about natural calamity issues!</Typography>
        </div>
      </Dialog>

      {/* Remediation Dialog */}
      <Dialog open={openRemediationDialog} onClose={toggleRemediationDialog}>
        <div style={{ padding: '20px', width: '400px' }}>
          <Typography variant="h6">Add Natural Calamity Data</Typography>
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
        <Typography variant="h6">Saved Natural Calamity Data</Typography>
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

export default NaturalCalamityIssues
