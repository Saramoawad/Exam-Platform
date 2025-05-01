exports.validation = (schema) => {
    return (req, res, next) => {
      let validationObject = schema.validate(
        { ...req.body, ...req.params },
        {
          abortEarly: false,
        }
      );
      if (validationObject.error) {
        return res
          .status(422)
          .json({ status: "fail", message: ValidationObject.error.details });
      } else {
        next();
      }
    };
  };
  