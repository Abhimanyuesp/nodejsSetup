const { body } = require("express-validator");
const validateRequest = require("../shared_modules/expressvalidator");

exports.validateUserRequest = validateRequest([
  body("address").notEmpty().isString().withMessage("address required!"),
  body("signature").notEmpty().isString().withMessage("signature required!"),
]);
