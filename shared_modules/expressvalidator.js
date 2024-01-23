const { validationResult } = require("express-validator");
const response = require("./response");

const validateRequest = (validations) => {
  return async (req, res, next) => {
    // Run the specified validations
    await Promise.all(validations.map((validation) => validation.run(req)));
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send(response(422, false, `${errors.errors[0].msg}`));
    }
    // If no validation errors, continue with the next middleware/route handler
    next();
  };
};

module.exports = validateRequest;
