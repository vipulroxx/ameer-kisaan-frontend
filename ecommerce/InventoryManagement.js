import React, { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TablePagination,
  Tooltip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

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

const InventoryManagement = () => {
  const [inventoryData, setInventoryData] = useState(initialInventoryData);
  const [open, setOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleClickOpen = (product = null) => {
    setCurrentProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setCurrentProduct(null);
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newProduct = {
      id: currentProduct ? currentProduct.id : Date.now(),
      productName: formData.get('productName'),
      variety: formData.get('variety'),
      quantity: formData.get('quantity'),
      price: formData.get('price'),
      harvestDate: formData.get('harvestDate'),
      qualityGrade: formData.get('qualityGrade'),
      packagingType: formData.get('packagingType')
    };

    if (currentProduct) {
      setInventoryData((prevData) => 
        prevData.map((product) => (product.id === currentProduct.id ? newProduct : product))
      );
    } else {
      setInventoryData((prevData) => [...prevData, newProduct]);
    }
    
    handleClose();
  };

  const handleDelete = (id) => {
    setInventoryData((prevData) => prevData.filter((product) => product.id !== id));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: '#f9f9f9', borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h5" gutterBottom>
        Inventory Management
      </Typography>
      <IconButton color="primary" onClick={() => handleClickOpen()} sx={{ mb: 2 }}>
        <AddIcon /> Add Product
      </IconButton>
      <TableContainer component={Paper} sx={{ marginTop: 2, borderRadius: 2, overflow: 'hidden' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#4caf50', color: '#fff' }}>
              <TableCell sx={{ color: '#fff' }}><strong>Product Name</strong></TableCell>
              <TableCell sx={{ color: '#fff' }}><strong>Variety</strong></TableCell>
              <TableCell sx={{ color: '#fff' }}><strong>Quantity (kg)</strong></TableCell>
              <TableCell sx={{ color: '#fff' }}><strong>Price (INR/kg)</strong></TableCell>
              <TableCell sx={{ color: '#fff' }}><strong>Harvest Date</strong></TableCell>
              <TableCell sx={{ color: '#fff' }}><strong>Quality Grade</strong></TableCell>
              <TableCell sx={{ color: '#fff' }}><strong>Packaging</strong></TableCell>
              <TableCell align="right" sx={{ color: '#fff' }}><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventoryData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
              <TableRow 
                key={product.id} 
                sx={{ 
                  backgroundColor: '#ffffff', 
                  '&:nth-of-type(odd)': { backgroundColor: '#f1f1f1' }, 
                  '&:hover': { backgroundColor: '#e0f7fa' }
                }}
              >
                <TableCell>{product.productName}</TableCell>
                <TableCell>{product.variety}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.harvestDate}</TableCell>
                <TableCell>{product.qualityGrade}</TableCell>
                <TableCell>{product.packagingType}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Edit">
                    <IconButton color="primary" onClick={() => handleClickOpen(product)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton color="secondary" onClick={() => handleDelete(product.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={inventoryData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentProduct ? 'Edit Product' : 'Add Product'}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              margin="dense"
              label="Product Name"
              name="productName"
              type="text"
              fullWidth
              defaultValue={currentProduct ? currentProduct.productName : ''}
              required
            />
            <TextField
              margin="dense"
              label="Variety"
              name="variety"
              type="text"
              fullWidth
              defaultValue={currentProduct ? currentProduct.variety : ''}
              required
            />
            <TextField
              margin="dense"
              label="Quantity (kg)"
              name="quantity"
              type="number"
              fullWidth
              defaultValue={currentProduct ? currentProduct.quantity : ''}
              required
            />
            <TextField
              margin="dense"
              label="Price (INR/kg)"
              name="price"
              type="number"
              fullWidth
              defaultValue={currentProduct ? currentProduct.price : ''}
              required
            />
            <TextField
              margin="dense"
              label="Harvest Date"
              name="harvestDate"
              type="date"
              fullWidth
              defaultValue={currentProduct ? currentProduct.harvestDate : ''}
              required
            />
            <TextField
              margin="dense"
              label="Quality Grade"
              name="qualityGrade"
              type="text"
              fullWidth
              defaultValue={currentProduct ? currentProduct.qualityGrade : ''}
              required
            />
            <TextField
              margin="dense"
              label="Packaging Type"
              name="packagingType"
              type="text"
              fullWidth
              defaultValue={currentProduct ? currentProduct.packagingType : ''}
              required
            />
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" color="primary">{currentProduct ? 'Update' : 'Add'}</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default InventoryManagement;