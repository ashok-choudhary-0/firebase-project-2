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
  body("title").notEmpty().withMessage("Title value cant be empty"),
  body("description").notEmpty().withMessage("Description value cant be empty"),
  body("slug").notEmpty().withMessage("Slug value cant be empty"),
  header("uid").notEmpty().withMessage("Uid value cant be empty")
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