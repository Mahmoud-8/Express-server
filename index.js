const express = require('express');
const { body, validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors'); // Import the cors library

const app = express();
const port = 3000;

app.use(express.json());
 // Enable CORS middleware
 app.use(cors());

app.use(express.json());

let mockdata = [
  { task: "Build a to-do app!", status: 'open', id: '01' },
  { task: "Learn SQL", status: 'open', id: '02' },
  { task: "Practice JS on Codewars", status: 'open', id: '03' },
  { task: "Commit your code!", status: 'open', id: '04' },
  { task: "Relax", status: 'open', id: '05' },
  { task: "Test the app", status: 'open', id: '06' },
];

// Validation and sanitization rules for a valid task
const validTask = [
  body('task')
    .notEmpty()
    .withMessage('Task cannot be empty')
    .trim()
    .escape(),
  body('status')
    .isIn(['open', 'done'])
    .withMessage('Status can only be "open" or "done"')
    .trim()
    .escape(),
];

// GET request for /todos
app.get('/todos', (req, res) => {
  res.status(200).json(mockdata);
});

// POST request for /todos
app.post('/todos', validTask, (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const newTask = {
    task: req.body.task,
    status: req.body.status,
    id: uuidv4(),
  };

  mockdata.push(newTask);

  res.status(201).json({ message: 'Data created successfully' });
});

// PUT request for /todos/:id (Update a specific task by ID)
app.put('/todos/:id', validTask, (req, res) => {
  const taskId = req.params.id;
  const updatedTask = req.body;

  const taskIndex = mockdata.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }

  mockdata[taskIndex] = {
    ...mockdata[taskIndex],
    ...updatedTask,
  };

  res.status(200).json({ message: 'Data updated successfully' });
});

// DELETE request for /todos/:id (Delete a specific task by ID)
app.delete('/todos/:id', (req, res) => {
  const taskId = req.params.id;

  const taskIndex = mockdata.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }

  mockdata.splice(taskIndex, 1);

  res.status(200).json({ message: 'Data deleted successfully' });
});

// Error handling
app.use('*', (req, res, next) => {
  const error = new Error('There is no path here!');
  error.statusCode = 404;
  next(error);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({ message: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
