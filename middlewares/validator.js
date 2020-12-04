const { check, validationResult } = require('express-validator');

exports.registerRules = () => [
  check(`name`, `User name is required!`).notEmpty(),
  check(`reason`, `this field is required!`).notEmpty(),
  check('email', `this should be a valid email!`).isEmail(),
  check('email', `User email is required!`).notEmpty(),
  check('password', `this field should be at least 4 char!`).isLength({
    min: 4,
  }),
  check('phone', `Your phone number should be 8 numbers!`).isLength({
    min: 8,max:8
  }),
  check('age', `User age is required!`).notEmpty(),
  check('age', `this should be a valid age!`).isLength({
    min: 1,max:2
  }),
];
exports.loginRules = () => [
  
  check('email', `this should be valid email!`).isEmail(),
  check('email', `this field is required!`).notEmpty(),
  check('password', `this field should be at least 4 char!`).isLength({
    min: 4,
  }),
];

exports.validator = (req, res, next) => {
  const errors = validationResult(req);
  errors.isEmpty() ? next() : res.status(400).json({ errors: errors.array() });
};