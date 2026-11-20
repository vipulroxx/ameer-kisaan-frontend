import React, { useCallback, useEffect, useState } from 'react';
import { Alert, CircularProgress } from '@mui/material';
import { inventoryApi } from '../services/api';
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



const InventoryManagement = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setInventoryData(await inventoryApi.list());
      setError('');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const product = {
      productName: formData.get('productName'),
      variety: formData.get('variety'),
      quantity: Number(formData.get('quantity')),
      price: Number(formData.get('price')),
      harvestDate: formData.get('harvestDate') || null,
      qualityGrade: formData.get('qualityGrade'),
      packagingType: formData.get('packagingType'),
    };
    setSaving(true);
    try {
      if (currentProduct) {
        const saved = await inventoryApi.update(currentProduct.id, product);
        setInventoryData((prev) => prev.map((p) => (p.id === saved.id ? saved : p)));
      } else {
        const saved = await inventoryApi.create(product);
        setInventoryData((prev) => [saved, ...prev]);
      }
      setError('');
      handleClose();
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await inventoryApi.remove(id);
      setInventoryData((prev) => prev.filter((product) => product.id !== id));
    } catch (e) {
      setError(e.message);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box className="inventory-root">
      <Typography variant="h5" gutterBottom>
        Inventory Management
      </Typography>
      <IconButton color="primary" onClick={() => handleClickOpen()} sx={{ mb: 2 }}>
        <AddIcon /> Add Product
      </IconButton>
      {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>{error}</Alert>}
      {loading && <CircularProgress size={24} sx={{ ml: 2 }} />}
      {!loading && inventoryData.length === 0 && (
        <Typography color="text.secondary">No items yet. Use "Add Product" to record your seeds, produce, fertiliser and equipment.</Typography>
      )}
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
              inputProps={{ min: 0, step: 'any' }}
              fullWidth
              defaultValue={currentProduct ? currentProduct.quantity : ''}
              required
            />
            <TextField
              margin="dense"
              label="Price (INR/kg)"
              name="price"
              type="number"
              inputProps={{ min: 0, step: 'any' }}
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
              defaultValue={currentProduct ? currentProduct.harvestDate || '' : ''}
              InputLabelProps={{ shrink: true }}
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
              <Button type="submit" color="primary" disabled={saving}>{currentProduct ? 'Update' : 'Add'}</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default InventoryManagement;