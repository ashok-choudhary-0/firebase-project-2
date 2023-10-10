const { body, header, validationResult } = require("express-validator")
const validateFields = [
  body("firstName").notEmpty(),
  body("lastName").notEmpty(),
  body("mobileNo").notEmpty(),
  body("email").isEmail(),
  body("password").notEmpty(),
  body("confirmPassword").custom((value, { req }) => value === req.body.password).withMessage("Password and confirmPassword should be same"), body("profilePhoto").notEmpty()
]
const validatePostFields = [
  body("title").notEmpty(),
  body("description").notEmpty(),
  body("slug").notEmpty(),
  header("uid").notEmpty()
]
const validateFieldErrors = (req, res, next) => {
  const validateFieldErrors = validationResult(req);
  if (!validateFieldErrors.isEmpty()) {
    res.status(404).send({ validateFieldErrors })
    return;
  }
  next();
}
module.exports = { validateFields, validatePostFields, validateFieldErrors }