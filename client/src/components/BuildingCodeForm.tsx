import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Container,
  useTheme,
  useMediaQuery,
  Snackbar,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface FormData {
  buildingName: string;
  code: string;
}

const BuildingCodeForm = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<FormData>({
    buildingName: '',
    code: ''
  });
  
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/building-codes`, formData);
      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      console.error('Error adding building code:', error);
      setError('Failed to add building code. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 2, sm: 4 } }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: { xs: 2, sm: 3 },
          borderRadius: { xs: 2, sm: 3 },
          backgroundColor: theme.palette.background.paper,
          boxShadow: isMobile ? '0 2px 8px rgba(0,0,0,0.1)' : theme.shadows[3]
        }}
      >
        <Typography 
          variant={isMobile ? "h6" : "h5"} 
          component="h1" 
          gutterBottom 
          align="center"
          sx={{ mb: { xs: 2, sm: 3 } }}
        >
          Add Building Code
        </Typography>
        
        <Box 
          component="form" 
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: 2, sm: 3 }
          }}
        >
          <TextField
            fullWidth
            label="Building Name"
            name="buildingName"
            value={formData.buildingName}
            onChange={handleChange}
            required
            sx={{ 
              '& .MuiInputBase-root': {
                height: isMobile ? '48px' : '56px'
              }
            }}
          />

          <TextField
            fullWidth
            label="Code"
            name="code"
            value={formData.code}
            onChange={handleChange}
            required
            sx={{ 
              '& .MuiInputBase-root': {
                height: isMobile ? '48px' : '56px'
              }
            }}
          />

          <Button 
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size={isMobile ? "large" : "medium"}
            sx={{ 
              mt: { xs: 1, sm: 2 },
              py: isMobile ? 1.5 : 1.8,
              fontSize: isMobile ? '1rem' : '1.1rem',
              textTransform: 'none',
              borderRadius: isMobile ? '8px' : '4px',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.8)'
              },
              '&:active': {
                transform: isMobile ? 'scale(0.98)' : 'none'
              }
            }}
          >
            Add Building Code
          </Button>
        </Box>
      </Paper>

      <Snackbar 
        open={!!error} 
        autoHideDuration={6000} 
        onClose={() => setError('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={success}
        autoHideDuration={1500}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Building code added successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default BuildingCodeForm;
