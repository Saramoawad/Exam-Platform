const multer = require("multer");

const globalErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res
        .status(400)
        .json({ status: "fail", message: "File size exceeds 20MB limit" });
    }
    return res.status(400).json({ status: "fail", message: err.message });
  }
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong, please try again";

  res.status(statusCode).json({
    message: message,
  });
};

module.exports = globalErrorHandler;
