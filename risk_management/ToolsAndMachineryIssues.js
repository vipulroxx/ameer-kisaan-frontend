import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Dialog, List, ListItem, ListItemText, Grid, IconButton, TextField, Snackbar, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { ExpandMore, Close, Chat, Add } from '@mui/icons-material';
import { Bar, Pie } from 'react-chartjs-2';

const toolsData = [
  { title: "Tractor Issues", description: "Common issues related to tractors.", stats: "35% of farmers face maintenance issues." },
  { title: "Irrigation System", description: "Problems with water supply and efficiency.", stats: "30% efficiency loss reported." },
  { title: "Harvesting Equipment", description: "Issues with cutting mechanisms and speed.", stats: "10% time loss in harvest." },
  { title: "Fertilizer Spreaders", description: "Malfunctions affecting spread efficiency.", stats: "20% under-spreading noted." },
];

// Mock chart data
const chartData = {
  toolIssues: {
    labels: ['Tractor', 'Irrigation', 'Harvesting', 'Spreaders'],
    datasets: [{ label: 'Reported Issues', data: [30, 25, 15, 20], backgroundColor: ['#3f51b5', '#e91e63', '#ff9800', '#4caf50'] }]
  },
};

const ToolsAndMachineryIssues = () => {
  const [expanded, setExpanded] = useState(null);
  const [openHelpChat, setOpenHelpChat] = useState(false);
  const [openRemediationDialog, setOpenRemediationDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [severity, setSeverity] = useState('success');
  const [savedData, setSavedData] = useState([]);
  const [newToolData, setNewToolData] = useState({ tool: '', issue: '', description: '' });

  const handleExpandClick = (index) => setExpanded(expanded === index ? null : index);

  const toggleHelpChat = () => setOpenHelpChat(!openHelpChat);
  const toggleRemediationDialog = () => setOpenRemediationDialog(!openRemediationDialog);

  const handleSnackbarClose = () => setOpenSnackbar(false);

  const handleInputChange = (field, value) => setNewToolData({ ...newToolData, [field]: value });

  const saveData = () => {
    if (!newToolData.tool || !newToolData.issue || !newToolData.description) {
      setSeverity('warning');
      setSnackbarMessage('All fields are required!');
      setOpenSnackbar(true);
      return;
    }

    setSavedData([...savedData, newToolData]);
    setNewToolData({ tool: '', issue: '', description: '' });
    setSeverity('success');
    setSnackbarMessage('Data saved successfully!');
    setOpenSnackbar(true);
    toggleRemediationDialog();
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>Tools and Machinery Issues</Typography>

      {/* Cards Displaying Tool Issues */}
      <Grid container spacing={2}>
        {toolsData.map((tool, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">{tool.title}</Typography>
                <Typography variant="body2" color="text.secondary">{tool.description}</Typography>
                <Button size="small" onClick={() => handleExpandClick(index)} endIcon={<ExpandMore />}>View Details</Button>
                {expanded === index && (
                  <div style={{ marginTop: '10px' }}>
                    <Typography variant="body2">Stats: {tool.stats}</Typography>
                    <Typography variant="body2" color="text.primary">Suggested Actions</Typography>
                    <List dense>
                      {['Regular maintenance checks', 'Use quality parts', 'Consult with a technician', 'Keep a maintenance log'].map((suggestion, i) => (
                        <ListItem key={i}>
                          <ListItemText primary={suggestion} />
                        </ListItem>
                      ))}
                    </List>
                    <div style={{ marginTop: '10px' }}>
                      <Pie data={chartData.toolIssues} />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add Tool Issue Data Button */}
      <Button variant="contained" color="secondary" startIcon={<Add />} style={{ marginTop: '20px' }} onClick={toggleRemediationDialog}>
        Add Tool Issue Data
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
          <Typography variant="body2">Ask us anything about tool issues!</Typography>
        </div>
      </Dialog>

      {/* Remediation Dialog */}
      <Dialog open={openRemediationDialog} onClose={toggleRemediationDialog}>
        <div style={{ padding: '20px', width: '400px' }}>
          <Typography variant="h6">Add Tool Issue Data</Typography>
          <IconButton style={{ position: 'absolute', top: '10px', right: '10px' }} onClick={toggleRemediationDialog}><Close /></IconButton>
          <TextField label="Tool Type" fullWidth style={{ marginTop: '10px' }} value={newToolData.tool} onChange={(e) => handleInputChange('tool', e.target.value)} />
          <TextField label="Issue" fullWidth style={{ marginTop: '10px' }} value={newToolData.issue} onChange={(e) => handleInputChange('issue', e.target.value)} />
          <TextField label="Description" fullWidth multiline rows={3} style={{ marginTop: '10px' }} value={newToolData.description} onChange={(e) => handleInputChange('description', e.target.value)} />
          <Button variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }} onClick={saveData}>Save Data</Button>
        </div>
      </Dialog>

      {/* Snackbar Notifications */}
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={severity} sx={{ width: '100%' }}>{snackbarMessage}</Alert>
      </Snackbar>

      {/* Table to Display Saved Data */}
      <div style={{ marginTop: '20px' }}>
        <Typography variant="h6">Saved Tool Issues Data</Typography>
        <TableContainer component={Paper} style={{ marginTop: '10px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tool Type</TableCell>
                <TableCell>Issue</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {savedData.map((data, index) => (
                <TableRow key={index}>
                  <TableCell>{data.tool}</TableCell>
                  <TableCell>{data.issue}</TableCell>
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

export default ToolsAndMachineryIssues;
