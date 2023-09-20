const express = require("express");
const { body, validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors"); // Import the cors library
const mongoose = require("mongoose");
require('dotenv').config()

const app = express();
const port = 3000;

app.use(express.json());
// Enable CORS middleware
app.use(cors());

app.use(express.json());

// Connect to the MongoDB database

let connectionStringOfDB = process.env.DATABASE_CONNECTION;

  let options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  mongoose
  .connect(connectionStringOfDB, options) 
  .then(() => {
    console.log('Connected to database');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });



  // Define the Todo schema and model
  const todoSchema = new mongoose.Schema({
    task: String,
    status: String,
    id: String,
  });
  
  const Todo = mongoose.models.Todo || mongoose.model('Todo', todoSchema);



// Validation and sanitization rules for a valid task
const validTask = [
  body("task")
  .notEmpty()
  .withMessage("Task cannot be empty")
  .trim()
  .escape(),

  body("status")
    .isIn(["open", "done"])
    .withMessage('Status can only be "open" or "done"')
    .trim()
    .escape(),
];

// GET request
app.get('/todos', async (req, res, next) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    const getError = new Error('Could not fetch data');
    next(getError);
  }
});


// POST request
app.post('/todos', validTask, async (req, res, next) => {
  const errors = validationResult(req);
console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { task, status } = req.body;

    const newTask = await Todo.create({ task, status, id: uuidv4() });


    res.status(201).json({
      success: true,
      message: `Data was saved! You now have to: ${newTask.task}`,
    });
  } catch (error) {
    console.error(error);
    const postError = new Error("Could not post data");
    next(postError);
  }
});






// PUT request 
app.put('/todos/:id', validTask, async (req, res, next) => {
  const taskId = req.params.id;
  const updatedTask = req.body;

  try {
    const task = await Todo.findOneAndUpdate({ id: taskId }, updatedTask, {
      new: true,
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Data updated successfully' });
  } catch (error) {
    console.error(error);
    const putError = new Error('Could not update data');
    next(putError);
  }
});

// DELETE request 
app.delete('/todos/:id', async (req, res, next) => {
  const taskId = req.params.id;

  try {
    const task = await Todo.findOneAndDelete({ id: taskId });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Data deleted successfully' });
  } catch (error) {
    console.error(error);
    const deleteError = new Error('Could not delete data');
    next(deleteError);
  }
});




// Error handling
app.use("*", (req, res, next) => {
  const error = new Error("There is no path here!");
  error.statusCode = 404;
  next(error);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({ message: "Internal server error" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
