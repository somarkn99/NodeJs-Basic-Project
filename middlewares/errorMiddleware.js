const ApiError = require("../utils/apiError");

const globalError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    // @desc: Where the error happen
    stack: err.stack,
  });
};

module.exports = globalError;
