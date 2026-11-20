// MarketPrices.js
import React, { useState } from 'react';
import { Box, Typography, Button, Paper, Grid, Snackbar, Alert, TextField } from '@mui/material';
import { FaShoppingCart } from 'react-icons/fa';

// New inventory data
const initialInventoryData = [
  { id: 1, productName: 'Rice', variety: 'Basmati', quantity: 1000, price: 1800, harvestDate: '2023-10-01', qualityGrade: 'A', packagingType: 'Bag' },
  { id: 2, productName: 'Wheat', variety: 'Durum', quantity: 1500, price: 1500, harvestDate: '2023-10-15', qualityGrade: 'B', packagingType: 'Bulk' },
  { id: 3, productName: 'Corn', variety: 'Sweet', quantity: 800, price: 2000, harvestDate: '2023-09-25', qualityGrade: 'A', packagingType: 'Bag' },
  { id: 4, productName: 'Soybean', variety: 'Non-GMO', quantity: 600, price: 2200, harvestDate: '2023-09-30', qualityGrade: 'A', packagingType: 'Bag' },
  { id: 5, productName: 'Barley', variety: 'Hulled', quantity: 700, price: 1600, harvestDate: '2023-08-15', qualityGrade: 'B', packagingType: 'Bulk' },
  { id: 6, productName: 'Sorghum', variety: 'Red', quantity: 900, price: 1400, harvestDate: '2023-08-20', qualityGrade: 'A', packagingType: 'Bag' },
  { id: 7, productName: 'Potatoes', variety: 'Yukon Gold', quantity: 1200, price: 500, harvestDate: '2023-09-05', qualityGrade: 'A', packagingType: 'Bulk' },
  { id: 8, productName: 'Tomatoes', variety: 'Roma', quantity: 400, price: 1000, harvestDate: '2023-09-15', qualityGrade: 'A', packagingType: 'Box' },
  { id: 9, productName: 'Onions', variety: 'Yellow', quantity: 300, price: 600, harvestDate: '2023-09-10', qualityGrade: 'A', packagingType: 'Bag' },
  { id: 10, productName: 'Carrots', variety: 'Nantes', quantity: 500, price: 700, harvestDate: '2023-09-12', qualityGrade: 'A', packagingType: 'Bag' },
  { id: 11, productName: 'Lettuce', variety: 'Romaine', quantity: 250, price: 800, harvestDate: '2023-09-18', qualityGrade: 'A', packagingType: 'Box' },
  { id: 12, productName: 'Pumpkins', variety: 'Pie', quantity: 200, price: 1200, harvestDate: '2023-10-10', qualityGrade: 'B', packagingType: 'Bulk' },
  { id: 13, productName: 'Cucumber', variety: 'English', quantity: 350, price: 900, harvestDate: '2023-09-28', qualityGrade: 'A', packagingType: 'Box' },
  { id: 14, productName: 'Bell Peppers', variety: 'Green', quantity: 450, price: 1100, harvestDate: '2023-09-22', qualityGrade: 'A', packagingType: 'Box' },
  { id: 15, productName: 'Strawberries', variety: 'Chandler', quantity: 150, price: 2500, harvestDate: '2023-09-30', qualityGrade: 'A', packagingType: 'Box' },
  { id: 16, productName: 'Blueberries', variety: 'Bluecrop', quantity: 100, price: 3000, harvestDate: '2023-09-25', qualityGrade: 'A', packagingType: 'Box' },
  { id: 17, productName: 'Apple Seeds', variety: 'Fuji', quantity: 500, price: 200, harvestDate: '2023-10-01', qualityGrade: 'A', packagingType: 'Packet' },
  { id: 18, productName: 'Tomato Seeds', variety: 'Cherry', quantity: 300, price: 150, harvestDate: '2023-09-15', qualityGrade: 'A', packagingType: 'Packet' },
  { id: 19, productName: 'Corn Seeds', variety: 'Sweet', quantity: 400, price: 180, harvestDate: '2023-09-20', qualityGrade: 'A', packagingType: 'Packet' },
  { id: 20, productName: 'Organic Fertilizer', variety: 'NPK', quantity: 1000, price: 1200, harvestDate: '2023-10-05', qualityGrade: 'A', packagingType: 'Bag' },
  { id: 21, productName: 'Chemical Fertilizer', variety: 'Urea', quantity: 800, price: 1000, harvestDate: '2023-10-10', qualityGrade: 'A', packagingType: 'Bag' },
  { id: 22, productName: 'Pesticide', variety: 'Neem Oil', quantity: 200, price: 1500, harvestDate: '2023-10-02', qualityGrade: 'A', packagingType: 'Bottle' },
  { id: 23, productName: 'Herbicide', variety: 'Glyphosate', quantity: 150, price: 2000, harvestDate: '2023-10-01', qualityGrade: 'A', packagingType: 'Bottle' },
  { id: 24, productName: 'Tractor', variety: 'John Deere', quantity: 5, price: 1500000, harvestDate: '2023-08-15', qualityGrade: 'New', packagingType: 'N/A' },
  { id: 25, productName: 'Plough', variety: 'Manual', quantity: 10, price: 5000, harvestDate: '2023-09-10', qualityGrade: 'Used', packagingType: 'N/A' },
  { id: 26, productName: 'Sprayer', variety: 'Handheld', quantity: 20, price: 2000, harvestDate: '2023-09-15', qualityGrade: 'New', packagingType: 'N/A' },
  { id: 27, productName: 'Harvesting Machine', variety: 'Combine', quantity: 2, price: 800000, harvestDate: '2023-07-20', qualityGrade: 'New', packagingType: 'N/A' },
  { id: 28, productName: 'Water Pump', variety: 'Electric', quantity: 15, price: 10000, harvestDate: '2023-08-25', qualityGrade: 'New', packagingType: 'N/A' },
  { id: 29, productName: 'Fertilizer Spreader', variety: 'Manual', quantity: 10, price: 3000, harvestDate: '2023-09-05', qualityGrade: 'New', packagingType: 'N/A' },
  { id: 30, productName: 'Irrigation Hose', variety: 'Flexible', quantity: 100, price: 500, harvestDate: '2023-09-01', qualityGrade: 'A', packagingType: 'Roll' },
];
const MarketPrices = () => {
  const [marketItems, setMarketItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleAddToMarket = (item) => {
    setMarketItems((prev) => [...prev, item]);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const filteredItems = initialInventoryData.filter(item =>
    item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.variety.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.packagingType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate the running sum
  const totalCost = marketItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <Box sx={{ padding: 4, backgroundColor: '#fff', borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h4" gutterBottom color="primary">
        Add Products from Inventory
      </Typography>

      <TextField
        label="Search Products"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: 3 }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Grid container spacing={3} sx={{ maxHeight: 400, overflowY: 'auto' }}>
        {filteredItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id} margin={1}>
            <Paper
              sx={{
                padding: 2,
                backgroundColor: '#e3f2fd',
                height: '100%',
                transition: '0.3s',
                '&:hover': {
                  boxShadow: 4,
                  backgroundColor: '#bbdefb',
                },
              }}
            >
              <Typography variant="h6" sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                {item.productName} ({item.variety})
              </Typography>
              <Typography variant="body2">{`Quantity: ${item.quantity} units`}</Typography>
              <Typography variant="body2">{`Price: ₹${item.price} per unit`}</Typography>
              <Typography variant="body2">{`Harvest Date: ${item.harvestDate}`}</Typography>
              <Typography variant="body2">{`Quality Grade: ${item.qualityGrade}`}</Typography>
              <Typography variant="body2">{`Packaging: ${item.packagingType}`}</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleAddToMarket(item)}
                sx={{ marginTop: 1 }}
              >
                Add to Market
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" gutterBottom sx={{ marginTop: 3, color: 'primary.main' }}>
        Market Items <FaShoppingCart />
      </Typography>
      <Box sx={{ maxHeight: 200, overflowY: 'auto', marginBottom: 2, padding: 1, border: '1px solid #ccc', borderRadius: 1 }}>
        {marketItems.map((item, index) => (
          <Typography key={index} variant="body2" sx={{ padding: 0.5 }}>
            Added: {item.productName} ({item.variety}) - ₹{item.price} per unit
          </Typography>
        ))}
      </Box>

      <Typography variant="h6" sx={{ color: 'red', fontWeight: 'bold', marginTop: 2 }}>
        Total Cost: ₹{totalCost}
      </Typography>

      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Item added to market!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MarketPrices;
