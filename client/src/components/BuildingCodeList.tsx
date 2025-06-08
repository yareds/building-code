import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  TextField,
  Card,
  CardContent,
  Typography,
  IconButton,
  Grid,
  Box,
  Paper
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type { BuildingCode } from '../types/types';
import axios from 'axios';

const BuildingCodeList = () => {
  const [buildingCodes, setBuildingCodes] = useState<BuildingCode[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchBuildingCodes();
  }, []);

  const fetchBuildingCodes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/building-codes');
      setBuildingCodes(response.data);
    } catch (error) {
      console.error('Error fetching building codes:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this building code?')) {
      try {
        await axios.delete(`http://localhost:5000/api/building-codes/${id}`);
        fetchBuildingCodes();
      } catch (error) {
        console.error('Error deleting building code:', error);
      }
    }
  };

  const filteredBuildingCodes = buildingCodes.filter(
    (code) =>
      code.buildingName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      code.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 3, mb: 4 }}>
        <TextField
          fullWidth
          label="Search Building Codes"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 2 }}
        />
      </Paper>

      <Grid container spacing={3}>
        {filteredBuildingCodes.map((buildingCode) => (
          <Grid item xs={12} key={buildingCode._id}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <div>
                    <Typography variant="h6" component="h2">
                      {buildingCode.buildingName}
                    </Typography>
                    <Typography color="textSecondary">
                      Code: {buildingCode.code}
                    </Typography>
                  </div>
                  <div>
                    <IconButton
                      onClick={() => navigate(`/edit/${buildingCode._id}`)}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => buildingCode._id && handleDelete(buildingCode._id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BuildingCodeList; 