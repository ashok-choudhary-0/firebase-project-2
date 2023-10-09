const { body, header } = require("express-validator")
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
  body("photo").notEmpty(),
  body("slug").notEmpty(),
  header("uid").notEmpty()
]
module.exports = { validateFields, validatePostFields }