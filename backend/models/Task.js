const mongoose=require('mongoose');

const TaskSchema=new mongoose.Schema({
 userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  description: String,
  category: { type: String, enum: ['personal', 'work', 'urgent'] },
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  dueDate: Date
}, { timestamps: true });

module.exports=mongoose.model('Tasks', TaskSchema);