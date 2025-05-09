exports.validation = (schema) => {
    return (req, res, next) => {
      let validationObject = schema.validate(
        req.body,
        {
          abortEarly: false,
        }
      );
      if (validationObject.error) {
        return res
          .status(422)
          .json({ status: "fail", message: validationObject.error.details });
      } else {
        next();
      }
    };
  };
  