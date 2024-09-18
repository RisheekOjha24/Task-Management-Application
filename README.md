# Listify
A Task management web application built using the MERN stack. It allows users to create lists and add tasks to each list, providing a simple and efficient way to organize and manage tasks.


## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running The Application](#running-the-application)
- [Acknowledgements](#acknowledgements)

## Prerequisites

- Node.js and npm: You can download them from the official [Node.js website](https://nodejs.org/).
- MongoDB: Install MongoDB from the official [MongoDB website](https://www.mongodb.com/).
- MongoDB Compass: Recommended for easy database management, available at [MongoDB Compass](https://www.mongodb.com/products/compass).

## Installation

```
git clone https://github.com/RisheekOjha24/Task-Management-Application.git
```

### 1. Set Up Frontend
From root directory navigate to the frontend directory and install the required Node.js modules:

```
cd frontend
npm install
```

### 2. Set up Backend
Navigate to the server directory and install the required Node.js modules:
```
cd ..
cd server
npm install
```

## Environment Variables

### 1. Create a .env file in the frontend directory with the follwing variables:
```
VITE_BACKEND_URL="http://localhost:4500"
```
This variable holds the backend URL used by the frontend to establish a connection.

### 2. Create a .env file in the server directory with the following variables:
```
PORT=4500
MONGO_URL=mongodb://127.0.0.1:27017/TaskManagement
```
You can change the Port number and Database name

## Running The Application

### Frontend
   ```
   cd frontend
   npm run dev
   ```
Open a new terminal  

### Backend

  ```
  cd server
  npm run start
```

## Acknowledgements

- React
- Node.js
- Express
- MongoDB
