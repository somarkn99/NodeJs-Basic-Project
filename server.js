const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const dbConnection = require('./config/database');

dotenv.config({path:'config.env'});
const ApiError = require('./utils/apiError');

// DB Connection Configuration
dbConnection();

// express app
const app = express();

// Middleware
// @desc: Parsing JSON request (to JS Object)
app.use(express.json()); 

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    console.log(`You App is running in ${process.env.NODE_ENV} mode`);
}

// Routes
app.all('*',(req, res, next)=>{
  // @desc: Create error and send it to error handling middleware
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 404));
});

// @desc: Global Error Handling Middleware
app.use((err,req,res,next)=>{
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    // @desc: Where the error happen
    stack: err.stack,
  });
});

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(`Your App running on port ${PORT}`);
});