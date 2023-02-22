const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const dbConnection = require('./config/database');

dotenv.config({path:'config.env'});

// DB Connection Configuration
dbConnection();

// express app
const app = express();

// Middleware
app.use(express.json()); // Parsing JSON request (to JS Object)

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    console.log(`You App is running in ${process.env.NODE_ENV} mode`);
}

// Routes
app.all('*',(req, res, next)=>{
  // Create error and send it to error handling middleware
  const err = new Error(`Can't find this route: ${req.originalUrl}`);
  next(err.message);
});

// @desc: Global Error Handling Middleware
app.use((err,req,res,next)=>{
  res.status(400).json({err});
});

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(`Your App running on port ${PORT}`);
});