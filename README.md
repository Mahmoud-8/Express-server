# Server Documentation

This documentation provides an overview of the server code for your application, detailing the routes, functionality, and usage instructions.

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [API Routes](#api-routes)
  - [GET /todos](#get-todos)
  - [POST /todos](#post-todos)
  - [PUT /todos/:id](#put-todosid)
  - [DELETE /todos/:id](#delete-todosid)
- [Error Handling](#error-handling)
- [Running the Server](#running-the-server)

## Introduction

This Express.js server provides the backend for a to-do list application. It allows users to perform CRUD (Create, Read, Update, Delete) operations on to-do tasks stored in a MongoDB database. The server also handles validation and error responses.

## Prerequisites

Before running this server, make sure you have the following installed:

- Node.js
- MongoDB

## Project Structure

The server code follows a typical Express.js project structure with the following key files and directories:

- `server.js`: The main server file.
- `models/`: Contains the MongoDB schema and model definition.
- `routes/`: Contains route handlers for different API endpoints.
- `middlewares/`: Contains custom middleware functions.
- `.env`: Configuration file for environment variables.

## API Routes

### GET /todos

- **Description**: Fetch all to-do tasks from the database.
- **Request**: None.
- **Response**: An array of to-do tasks in JSON format.
- **Error Response**: 500 Internal Server Error if there's an issue with the database.

### POST /todos

- **Description**: Create a new to-do task and store it in the database.
- **Request**: JSON body with `task` and `status` properties.
- **Response**: JSON response with success status and a message.
- **Error Response**: 400 Bad Request if input validation fails, 500 Internal Server Error if there's an issue with the database.

### PUT /todos/:id

- **Description**: Update an existing to-do task by its ID.
- **Request**: JSON body with `task` and `status` properties.
- **Response**: JSON response with success status and a message.
- **Error Response**: 400 Bad Request if input validation fails, 404 Not Found if the task ID does not exist, 500 Internal Server Error if there's an issue with the database.

### DELETE /todos/:id

- **Description**: Delete an existing to-do task by its ID.
- **Request**: None.
- **Response**: JSON response with success status and a message.
- **Error Response**: 404 Not Found if the task ID does not exist, 500 Internal Server Error if there's an issue with the database.

## Error Handling

The server provides error handling for various scenarios, including invalid input, resource not found, and internal server errors. Errors are returned as JSON responses with appropriate status codes.

## Running the Server

To run the server, follow these steps:

1. Ensure you have Node.js and MongoDB installed.

2. Create a `.env` file in the root directory with the following content:

   ```env
   DATABASE_CONNECTION=YOUR_MONGODB_CONNECTION_URL
