// UserFeedback.js
import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

const UserFeedback = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle feedback submission
    console.log("Feedback submitted!");
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 2 }}>
      <Typography variant="h5">User Feedback</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Your Feedback"
          multiline
          rows={4}
          fullWidth
          variant="outlined"
          sx={{ marginBottom: 2 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit Feedback
        </Button>
      </form>
    </Box>
  );
};

export default UserFeedback;
