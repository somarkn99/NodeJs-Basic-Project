const express = require('express');
const dotenv = require('dotenv');
dotenv.config({path:'config.env'});

// express app
const app = express();

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(`Your App running on port ${PORT}`);
});