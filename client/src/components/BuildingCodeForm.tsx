import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box
} from '@mui/material';
import type { BuildingCodeFormData } from '../types/types';
import axios from 'axios';

const BuildingCodeForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState<BuildingCodeFormData>({
    buildingName: '',
    code: ''
  });

  useEffect(() => {
    if (id) {
      fetchBuildingCode();
    }
  }, [id]);

  const fetchBuildingCode = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/building-codes/${id}`);
      const { buildingName, code } = response.data;
      setFormData({ buildingName, code });
    } catch (error) {
      console.error('Error fetching building code:', error);
      navigate('/');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/building-codes/${id}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/building-codes', formData);
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving building code:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          {id ? 'Edit Building Code' : 'Add New Building Code'}
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Building Name"
            name="buildingName"
            value={formData.buildingName}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Building Code"
            name="code"
            value={formData.code}
            onChange={handleChange}
            margin="normal"
            required
          />
          <Box sx={{ mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              {id ? 'Update' : 'Add'} Building Code
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default BuildingCodeForm; 