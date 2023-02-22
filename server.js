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
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    console.log(`You App is running in ${process.env.NODE_ENV} mode`);
}


const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(`Your App running on port ${PORT}`);
});