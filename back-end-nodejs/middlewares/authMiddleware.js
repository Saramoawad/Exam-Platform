const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");

exports.auth = catchAsync(async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(new AppError(401, "please login first"));
  }
  let payload = jwt.verify(authorization, process.env.SECRET);
  console.log(payload);
  req.id = payload.id;
  req.role = payload.role;
  next();
});

exports.blockRoles = (...roles) => {
  return (req, res, next) => {
    if (roles.includes(req.role)) {
      return next(
        new AppError(403, "you don't have permission to perform this action")
      );
    }
    next();
  };
};
