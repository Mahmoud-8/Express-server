const express = require('express')
const app = express()
const port = 3000

let mockdata = [
    { text: "Build a to do app!", status: 'open', id: '01' },
    { text: "Learn SQL", status: 'open', id: '02'  },
    { text: "Practice JS on Codewars", status: 'open', id: '03'   },
    { text: "Commit your code!", status: 'open', id: '04'},
    { text: "Relax", status: 'open', id: '05' },
    { text: "Test the app", status: 'open', id: '06' },
  ]
  

app.get('/todos', (req, res) => {
  res.status(200).json(mockdata);
});

app.post('/todos', (req, res) => {
    res.status(201).json({ message: 'Data created successfully' });
  });






app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})