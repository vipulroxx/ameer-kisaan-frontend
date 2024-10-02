// ECommerce.js
import React, { useState } from 'react';
import { Button, TextField, Typography, Container } from '@mui/material';

const ECommerce = () => {
  const [product, setProduct] = useState({ name: '', price: '', image: null });

  const handleInputChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (event) => {
    setProduct({ ...product, image: event.target.files[0] });
  };

  const handleSubmit = () => {
    // Submit the product data
    console.log('Product Data:', product);
  };

  return (
    <Container>
      <Typography variant="h5">List Your Product</Typography>
      <TextField name="name" label="Product Name" fullWidth margin="normal" value={product.name} onChange={handleInputChange} />
      <TextField name="price" label="Price" fullWidth margin="normal" value={product.price} onChange={handleInputChange} />
      <input type="file" onChange={handleFileUpload} />
      <Button variant="contained" color="primary" onClick={handleSubmit}>List Product</Button>
    </Container>
  );
};

export default ECommerce;
