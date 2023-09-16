const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); 

let mockdata = [
  { text: "Build a to-do app!", status: 'open', id: '01' },
  { text: "Learn SQL", status: 'open', id: '02' },
  { text: "Practice JS on Codewars", status: 'open', id: '03' },
  { text: "Commit your code!", status: 'open', id: '04' },
  { text: "Relax", status: 'open', id: '05' },
  { text: "Test the app", status: 'open', id: '06' },
];

app.get('/todos', (req, res) => {
  res.status(200).json(mockdata);
});

app.post('/todos', (req, res) => {
  const newTask = req.body;

  mockdata.push(newTask);

  res.status(201).json({ message: 'Data created successfully' });
});

// PUT request for /todos
app.put('/todos', (req, res) => { 
  res.status(200).json({ message: 'Data updated successfully' });
});

// DELETE request for /todos
app.delete('/todos', (req, res) => {

  res.status(200).json({ message: 'Data deleted successfully' });
});

app.use((req, res, next) => {
  res.status(404).json({ message: 'Path not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
