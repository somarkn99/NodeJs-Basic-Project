const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config({path:'config.env'});
const dbConnection = require('./config/database');
const ApiError = require('./utils/apiError');
const globalError = require('./middlewares/errorMiddleware');

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
app.use(globalError);

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(`Your App running on port ${PORT}`);
});