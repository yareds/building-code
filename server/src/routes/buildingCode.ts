import express from 'express';
import BuildingCode from '../models/BuildingCode';

const router = express.Router();

// Get all building codes
router.get('/', async (req, res) => {
  try {
    const buildingCodes = await BuildingCode.find().sort({ createdAt: -1 });
    res.json(buildingCodes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching building codes' });
  }
});

// Get a single building code
router.get('/:id', async (req, res) => {
  try {
    const buildingCode = await BuildingCode.findById(req.params.id);
    if (!buildingCode) {
      return res.status(404).json({ message: 'Building code not found' });
    }
    res.json(buildingCode);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching building code' });
  }
});

// Create a new building code
router.post('/', async (req, res) => {
  try {
    const buildingCode = new BuildingCode(req.body);
    await buildingCode.save();
    res.status(201).json(buildingCode);
  } catch (error) {
    res.status(400).json({ message: 'Error creating building code' });
  }
});

// Update a building code
router.put('/:id', async (req, res) => {
  try {
    const buildingCode = await BuildingCode.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!buildingCode) {
      return res.status(404).json({ message: 'Building code not found' });
    }
    res.json(buildingCode);
  } catch (error) {
    res.status(400).json({ message: 'Error updating building code' });
  }
});

// Delete a building code
router.delete('/:id', async (req, res) => {
  try {
    const buildingCode = await BuildingCode.findByIdAndDelete(req.params.id);
    if (!buildingCode) {
      return res.status(404).json({ message: 'Building code not found' });
    }
    res.json({ message: 'Building code deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting building code' });
  }
});

export default router; 