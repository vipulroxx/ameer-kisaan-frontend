// FinancialTools.js
import React, { useState } from 'react';
import { Button, TextField, Typography, Container } from '@mui/material';

const FinancialTools = () => {
  const [expenses, setExpenses] = useState(0);
  const [income, setIncome] = useState(0);

  const calculateProfit = () => {
    return income - expenses;
  };

  return (
    <Container>
      <Typography variant="h5">Financial Tools</Typography>
      <TextField label="Expenses" type="number" fullWidth margin="normal" value={expenses} onChange={(e) => setExpenses(e.target.value)} />
      <TextField label="Income" type="number" fullWidth margin="normal" value={income} onChange={(e) => setIncome(e.target.value)} />
      <Typography>Profit: {calculateProfit()}</Typography>
      <Button variant="contained" color="primary">Save</Button>
    </Container>
  );
};

export default FinancialTools;
