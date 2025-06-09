import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

const Navbar = () => {
  return (
    <AppBar 
      position="static" 
      sx={{
        backgroundColor: '#1976d2',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}
    >
      <Toolbar>
        <Typography 
          variant="h6" 
          component={RouterLink} 
          to="/"
          sx={{ 
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
            fontWeight: 500,
            '&:hover': {
              color: 'rgba(255, 255, 255, 0.9)'
            }
          }}
        >
          Building Codes
        </Typography>

        <Box sx={{ display: 'flex', gap: { xs: 1, sm: 2 } }}>
          <Button
            component={RouterLink}
            to="/add"
            color="inherit"
            startIcon={<AddIcon />}
            sx={{
              fontWeight: 500,
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.8)'
              },
              px: { xs: 1.5, sm: 2 },
              py: 1,
              borderRadius: '4px',
              textTransform: 'none'
            }}
          >
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              Add Code
            </Box>
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
              Add
            </Box>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
