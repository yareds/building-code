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
  Alert,
  CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Use the current hostname for the API URL
const API_URL = `http://${window.location.hostname}:5000`;

// Log the API URL being used
console.log('Using API URL:', API_URL);

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
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      console.log('Submitting to:', `${API_URL}/api/building-codes`);
      
      const response = await axios({
        method: 'post',
        url: `${API_URL}/api/building-codes`,
        data: formData,
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      });

      console.log('Response:', response);

      if (response.status === 201 || response.status === 200) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        throw new Error('Unexpected response from server');
      }
    } catch (error: any) {
      console.error('Error details:', error);
      
      let errorMessage = 'Failed to add building code. Please try again.';
      
      if (error.response) {
        console.log('Error response:', error.response);
        errorMessage = error.response.data.message || 'Server error. Please try again.';
      } else if (error.request) {
        console.log('Error request:', error.request);
        errorMessage = 'Cannot connect to server. Please ensure the server is running and try again.';
      } else {
        console.log('Error message:', error.message);
        errorMessage = 'An unexpected error occurred. Please try again.';
      }
      
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleRetry = () => {
    setError('');
    setIsSubmitting(false);
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
            disabled={isSubmitting}
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
            disabled={isSubmitting}
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
            disabled={isSubmitting}
            size={isMobile ? "large" : "medium"}
            sx={{ 
              mt: { xs: 1, sm: 2 },
              py: isMobile ? 1.5 : 1.8,
              fontSize: isMobile ? '1rem' : '1.1rem',
              textTransform: 'none',
              borderRadius: isMobile ? '8px' : '4px',
              position: 'relative',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.8)'
              },
              '&:active': {
                transform: isMobile ? 'scale(0.98)' : 'none'
              }
            }}
          >
            {isSubmitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Add Building Code'
            )}
          </Button>

          {error && (
            <Button
              onClick={handleRetry}
              variant="outlined"
              color="primary"
              fullWidth
              size={isMobile ? "large" : "medium"}
              sx={{ 
                mt: 2,
                py: isMobile ? 1.5 : 1.8,
                fontSize: isMobile ? '1rem' : '1.1rem',
                textTransform: 'none',
                borderRadius: isMobile ? '8px' : '4px',
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                  backgroundColor: 'rgba(25, 118, 210, 0.04)'
                },
                '&:active': {
                  transform: isMobile ? 'scale(0.98)' : 'none'
                }
              }}
            >
              Try Again
            </Button>
          )}
        </Box>
      </Paper>

      <Snackbar 
        open={!!error} 
        autoHideDuration={10000}
        onClose={() => setError('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          severity="error" 
          sx={{ 
            width: '100%',
            ...(isMobile && {
              fontSize: '0.9rem',
              padding: '6px 12px'
            })
          }}
        >
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={success}
        autoHideDuration={2000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          severity="success" 
          sx={{ 
            width: '100%',
            ...(isMobile && {
              fontSize: '0.9rem',
              padding: '6px 12px'
            })
          }}
        >
          Building code added successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default BuildingCodeForm;
