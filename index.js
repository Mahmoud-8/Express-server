const express = require('express');
const { body, validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid'); 
const app = express();
const port = 3000;

app.use(express.json()); 

let mockdata = [
  { task: "Build a to-do app!", status: 'open', id: '01' },
  { task: "Learn SQL", status: 'open', id: '02' },
  { task: "Practice JS on Codewars", status: 'open', id: '03' },
  { task: "Commit your code!", status: 'open', id: '04' },
  { task: "Relax", status: 'open', id: '05' },
  { task: "Test the app", status: 'open', id: '06' },
];

// validation and sanitization rules for a valid task

const validTask = [
  body('task')
  .notEmpty()
  .withMessage('Task cannot be empty')
  .trim()
  .escape(),
  body('status')
  .isIn(['open','done'])
  .withMessage('Status can only be "open" or "done"')
  .trim()
  .escape(),
  body('id')
  .isUUID()
  .withMessage('Id needs to be a UUID')
  .trim()
  .escape(),

]

app.get('/todos', (req, res) => {
  res.status(200).json(mockdata);
});


// Generate a new UUID
const uuid = uuidv4();
console.log(uuid);


// GET request for /todos/:id

app.post('/todos',validTask, (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array() });
  }


  const newTask = {

    task: req.body.task,
    status: req.body.status,
    id: uuidv4(),
  }
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

// Error handling

app.use('*', (req, res, next) => {
  const error = new Error('There is no path here!');
  error.statusCode = 404;
  next(error);
});


app.use((err, req, res, next) => {
  console.error(err);
  res.status( err.statusCode || 500).json({ message: 'Internal server error' });
});




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
