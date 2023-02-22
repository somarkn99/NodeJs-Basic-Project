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
// @Security: for security reasons we limit size bode
// @link: https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html#set-request-size-limits
app.use(express.json({ limit: '20kb' }));

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    console.log(`You App is running in ${process.env.NODE_ENV} mode`);
}

// Routes
app.all('*',(req, res, next)=>{
  // @desc: Create error and send it to error handling middleware
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 404));
});

// @desc: Global Error Handling Middleware (from inside expressJs)
app.use(globalError);

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(`Your App running on port ${PORT}`);
});

// Handle rejection outside express
process.on('unhandledRejection', (err) => {
  console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shutting down....`);
    process.exit(1);
  });
});
