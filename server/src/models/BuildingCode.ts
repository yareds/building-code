import mongoose from 'mongoose';

const buildingCodeSchema = new mongoose.Schema({
  buildingName: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model('BuildingCode', buildingCodeSchema); 