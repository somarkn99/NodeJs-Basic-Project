const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config({path:'config.env'});

// express app
const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    console.log(`You App is running in ${process.env.NODE_ENV} mode`);
}


const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(`Your App running on port ${PORT}`);
});