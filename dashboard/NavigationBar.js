import React, { useState } from 'react';
import { AppBar, Toolbar, Box, Typography, Menu, MenuItem } from '@mui/material';
import IconButton from '../utils/IconButton';
import { FaHome, FaUserCircle } from 'react-icons/fa';
import { useTheme } from '@mui/material/styles';
import logoIcon from '../farmerapplogo.png';

const NavigationBar = ({ appName, onMenuSelect }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (menu) => {
    setAnchorEl(null);
    if (menu) {
      onMenuSelect(menu);
    }
  };

  return (
    <AppBar position="static" style={{ backgroundColor: theme.palette.primary.main }}>
      <Toolbar>
        <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
          <IconButton icon={<FaHome />} title="Home" />
          
          <Box display="flex" alignItems="center" sx={{ flexGrow: 1, justifyContent: 'center' }}>
            <Typography variant="h6" style={{ color: '#fff', display: 'flex', alignItems: 'center' }}>
              <img src={logoIcon} alt="Logo" style={{ width: 30, height: 'auto', marginRight: 8 }} />
              {appName}
            </Typography>
          </Box>
          
          <div>
            <IconButton onClick={handleMenuOpen} icon={<FaUserCircle />} title="" />
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => handleMenuClose()}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
              <MenuItem onClick={() => handleMenuClose('Profile')}>Profile</MenuItem>
              <MenuItem onClick={() => handleMenuClose('Settings')}>Settings</MenuItem>
              <MenuItem onClick={() => handleMenuClose('Logout')}>Logout</MenuItem>
            </Menu>
          </div>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
