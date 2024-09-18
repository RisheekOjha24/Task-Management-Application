# Listify
A list management web application built using the MERN stack. It allows users to create lists and add tasks to each list, providing a simple and efficient way to organize and manage tasks.


## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Acknowledgements](#acknowledgements)

## Prerequisites

- Node.js and npm: You can download them from the official [Node.js website](https://nodejs.org/).
- MongoDB: Install MongoDB from the official [MongoDB website](https://www.mongodb.com/).
- MongoDB Compass: Recommended for easy database management, available at [MongoDB Compass](https://www.mongodb.com/products/compass).

## Installation

```bash
git clone https://github.com/RisheekOjha24/InvoiceAlert.git
```

Frontend setup
```bash
cd frontend
npm install
```

Backend setup
```bash
cd ..
cd server
npm install
```

## Environment Variables

Create a .env file in the server directory with the following variables:

PORT=4500 <br>
MONGO_URL=mongodb://127.0.0.1:27017/ReminderSystem <br>
ZAPIER_WEBHOOK_URL=<your_zapier_webhook_url> <br>


Running the Application

1) Frontend
   ```bash
   cd frontend
   npm run dev

### Open a new terminal  

2) Backend

  ```bash
  cd server
  npm run start
```

## Acknowledgements

- React
- Node.js
- Express
- MongoDB
