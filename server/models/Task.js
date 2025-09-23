import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  name: { type: String, required: true },
  target: { type: Number, required: true },
  unit: { type: String, required: true },
  rewards: [
    {
      unit: { type: String, required: false },
      name: { type: String, required: false },
    },
  ],
  progress: [
    {
      date: { type: Date, default: Date.now },
      amount: { type: Number, required: false },
    },
  ],
}, { minimize: false });

export default mongoose.model('Task', taskSchema);