const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');

// Create Task
router.post('/', auth, async (req, res) => {
  const task = new Task({ ...req.body, userId: req.user.id });
  await task.save();
  res.json(task);
});

// Get Tasks (filter + sort)
router.get('/', auth, async (req, res) => {
  const { sortBy, category, status } = req.query;

  let filter = { userId: req.user.id };
  if (category) filter.category = category;
  if (status) filter.status = status;

  let query = Task.find(filter);
  if (sortBy === 'date') query = query.sort({ dueDate: 1 });

  const tasks = await query;
  res.json(tasks);
});

router.put('/:id', auth, async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    req.body,
    { new: true }
  );
  res.json(task);
});

// Delete Task
router.delete('/:id', auth, async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  res.json({ msg: 'Deleted' });
});

module.exports = router;