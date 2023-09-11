# A backend for the to do app!

## Set up:  
- Set up a new project using [express](https://expressjs.com/en/starter/installing.html)
### 1. Create a project: 

  Work on the terminal:
- `git init` 
This command creates a git project
Add a `.gitignore` and add the line `node_modules` to the file. 


- `npm init`
This command takes you though the process of creating the package.json file. Press `enter` to select the options suggested. 
You can make changes to this file afterwards.

  ### 2. Install Express

- `npm install express`

### 3. Create the first file

- Create a file `index.js` 
and enter the template code here: 

```js 
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```

### 4. Start the server!
On the terminal: type

`node index.js`

Now the server is running!
- You should see a console log on the terminal

- And you can send requests to it to `http://localhost:3000`
- Use Thunder client to send a request and inspect the response you get back!

**Optional**
Add a line to the package.json file in the `script` section: 

`"start": node index.js`

Now you can type `npm start` on the terminal to start the server!



## Task 1: Requests and error handling


1. Create a set of mock data to use

##### Example data: 
``` js
let mockdata = [
  { text: "Build a to do app!", status: 'open', id: '01' },
  { text: "Learn SQL", status: 'open', id: '02'  },
  { text: "Practice JS on Codewars", status: 'open', id: '03'   },
  { text: "Commit your code!", status: 'open', id: '04'},
  { text: "Relax", status: 'open', id: '05' },
  { text: "Test the app", status: 'open', id: '06' },
]

```

2. Add a  GET request in the `index.js` for the path `/todos` and a callback function in which send back some data that matches the data of the to do app! Add a status code for a successfull GET resquest (200)


3. Add a POST request in the `index.js` for the path `/todos` and a callback function in which send back a message that the data was created. 
4. Add a PUT request in the `index.js` for the path `/todos` and a callback function in which send back a message that the data was updated. 
3. Add a DELETE request in the `index.js` for the path `/todos` and a callback function in which send back a message that the data was deleted. 

### Error handling:
- Add error handling middleware for each controller, and for undefined paths
