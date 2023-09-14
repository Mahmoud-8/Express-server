const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // Automatically parse JSON request bodies

// Mock data
let mockdata = [
  { text: "Build a to-do app!", status: 'open', id: '01' },
  { text: "Learn SQL", status: 'open', id: '02' },
  { text: "Practice JS on Codewars", status: 'open', id: '03' },
  { text: "Commit your code!", status: 'open', id: '04' },
  { text: "Relax", status: 'open', id: '05' },
  { text: "Test the app", status: 'open', id: '06' },
];

// GET request for /todos
app.get('/todos', (req, res) => {
  res.status(200).json(mockdata);
});

// POST request for /todos
app.post('/todos', (req, res) => {
  // Assuming the request body contains the new task data
  const newTask = req.body;

  // Here, you can add the new task to the mockdata array or your database.
  // For simplicity, let's just push it to the mockdata array.
  mockdata.push(newTask);

  // Sending back a message indicating that the data was created
  res.status(201).json({ message: 'Data created successfully' });
});

// PUT request for /todos
app.put('/todos', (req, res) => {
  // Assuming the request body contains the updated task data
  // You can implement the logic to update the data here.

  // Sending back a message indicating that the data was updated
  res.status(200).json({ message: 'Data updated successfully' });
});

// DELETE request for /todos
app.delete('/todos', (req, res) => {
  // Assuming you want to delete all tasks.
  // You can implement the logic to delete data here.

  // Sending back a message indicating that the data was deleted
  res.status(200).json({ message: 'Data deleted successfully' });
});

// Error handling middleware for undefined paths
app.use((req, res, next) => {
  res.status(404).json({ message: 'Path not found' });
});

// Error handling middleware for controllers
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
