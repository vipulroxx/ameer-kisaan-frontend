import React, { useState } from 'react';
import { AppBar, Toolbar, Box, Typography, Menu, MenuItem } from '@mui/material';
import { FaHome, FaUserCircle } from 'react-icons/fa';
import { useTheme } from '@mui/material/styles';

const NavigationBar = ({ appName, onMenuSelect, isAuthenticated, onHomeClick }) => {
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
    <AppBar position="static" style={{ backgroundColor: theme.palette.primary.main, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)' }}>
      <Toolbar>
        <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
          {/* Home Icon */}
            <FaHome onClick={onHomeClick} style={{ 
              color: 'gold', // Change color to gold
              transition: '0.3s', 
              fontSize: '1.5rem' 
            }} />

          {/* App Name */}
          <Box display="flex" alignItems="center" sx={{ flexGrow: 1, justifyContent: 'center' }}>
            <Typography variant="h4" style={{ color: 'gold', display: 'flex', alignItems: 'center' }}>
              {appName.toUpperCase()} 
            </Typography>
          </Box>

          {/* User Menu */}
          <div>
            {isAuthenticated && (
              <>
                  <FaUserCircle onClick={handleMenuOpen} style={{ 
              color: 'gold', // Change color to gold
              transition: '0.3s', 
              fontSize: '1.5rem' 
            }} />
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
              </>
            )}
          </div>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
