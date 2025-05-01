const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong, please try again";

  res.status(statusCode).json({
    message: message,
  });
};

module.exports = globalErrorHandler;
