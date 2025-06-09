import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
            fontWeight: 'bold'
          }}
        >
          Building Code Search
        </Typography>
        <Box>
          <Button
            component={Link}
            to="/add"
            color="inherit"
            startIcon={<AddIcon />}
          >
            Add Building Code
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 