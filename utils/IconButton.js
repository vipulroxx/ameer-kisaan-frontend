import React from 'react';
import { IconButton as MuiIconButton, Tooltip, Typography } from '@mui/material';

const IconButton = ({ icon, title, onClick }) => {
  return (
    <Tooltip title={title}>
      <MuiIconButton color="inherit" style={{ display: 'flex', alignItems: 'center', transition: 'transform 0.2s' }} onClick={onClick}>
        {icon}
        <Typography variant="caption" display="block" style={{ marginLeft: '4px' }}>{title}</Typography>
      </MuiIconButton>
    </Tooltip>
  );
};

export default IconButton;
