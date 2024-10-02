import React, { useState } from 'react';
import { Grid, Paper, Typography, IconButton, Box, Dialog } from '@mui/material';
import { FaSeedling, FaAppleAlt, FaCarrot, FaTree, FaPepperHot, FaOilCan } from 'react-icons/fa';
import CloseIcon from '@mui/icons-material/Close';
import CropDetails from '../risk_management/CropDetails.js';

const crops = [
  { name: 'Vegetables', icon: <FaCarrot />, color: '#FF9800', description: ['Tomatoes', 'Onions', 'Carrots'] },
  { name: 'Fruits', icon: <FaAppleAlt />, color: '#F44336', description: ['Apples', 'Bananas', 'Mangoes'] },
  { name: 'Grains', icon: <FaSeedling />, color: '#8BC34A', description: ['Wheat', 'Rice', 'Maize'] },
  { name: 'Legumes', icon: <FaSeedling />, color: '#FFC107', description: ['Lentils', 'Chickpeas', 'Peas'] },
  { name: 'Herbs', icon: <FaTree />, color: '#4CAF50', description: ['Basil', 'Mint', 'Cilantro'] },
  { name: 'Root Crops', icon: <FaCarrot />, color: '#FF5722', description: ['Potatoes', 'Sweet Potatoes'] },
  { name: 'Spices', icon: <FaPepperHot />, color: '#FFEB3B', description: ['Chili', 'Turmeric'] },
  { name: 'Oilseeds', icon: <FaOilCan />, color: '#795548', description: ['Sunflower Seeds', 'Mustard Seeds'] },
];

const CropSelection = () => {
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleCategorySelect = (category) => {
    setSelectedCrop(category);
    setModalOpen(true);
  };

  const handleClose = () => {
    setSelectedCrop(null);
    setModalOpen(false);
  };

  return (
    <div>
      <Box sx={{ padding: 2 }}>
        <Typography variant="h5">Categories:</Typography>
        <Grid container spacing={2}>
          {crops.map((category) => (
            <Grid item xs={4} sm={4} md={3} key={category.name}>
              <Paper
                onClick={() => handleCategorySelect(category.name)}
                style={{
                  textAlign: 'center',
                  cursor: 'pointer',
                  padding: '16px',
                  transition: 'transform 0.2s',
                  backgroundColor: category.color,
                }}
                elevation={3}
              >
                <div style={{ fontSize: '40px' }}>{category.icon}</div>
                <Typography variant="h6">{category.name}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Show CropDetails in a modal when a category is selected */}
      <Dialog open={modalOpen} onClose={handleClose} fullWidth maxWidth="lg"> {/* Increased maxWidth here */}
        <div style={{ padding: '20px' }}>
          <IconButton onClick={handleClose} style={{ float: 'right' }}>
            <CloseIcon />
          </IconButton>
          {selectedCrop && <CropDetails crop={selectedCrop} onClose={handleClose} />}
        </div>
      </Dialog>
    </div>
  );
};

export default CropSelection;
