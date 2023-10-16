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
  header("uid").notEmpty().withMessage("Uid value cant be empty")
]
const validateTagUserFields = [
  body("postUid").notEmpty().withMessage("postUid can't be empty"),
  body("userUid").notEmpty().withMessage("userUid can't be empty")
]
const validateAddCommentFields = [
  body("comment").notEmpty().withMessage("comment can not be empty"),
  body("userUid").notEmpty().withMessage("userUid can not be empty"),
  body("postUid").notEmpty().withMessage("postUid can not be empty")
]
const validateDeleteCommentFields = [
  body("postUid").notEmpty().withMessage("postUid can not be empty"),
  body("commentUid").notEmpty().withMessage("commentUid can not be empty")
]
const validateEditCommentFields = [
  body("postUid").notEmpty().withMessage("postUid can not be empty"),
  body("commentUid").notEmpty().withMessage("commentUid can not empty"),
  body("comment").notEmpty().withMessage("comment can not be empty")
]
const validateSinglePostFields = [
  body("postUid").notEmpty().withMessage("postUid can not be empty")
]
const pushNotificationTokenFields = [
  header("token").notEmpty().withMessage("target FCM token can not be empty"),
  header('uuid').notEmpty().withMessage("userUid can not be empty")
]
const validateFieldErrors = (req, res, next) => {
  const validateFieldErrors = validationResult(req);
  if (!validateFieldErrors.isEmpty()) {
    res.status(404).send({ validateFieldErrors })
    return;
  }
  next();
}
module.exports = { validateFields, validatePostFields, validateFieldErrors, validateTagUserFields, validateAddCommentFields, validateDeleteCommentFields, validateEditCommentFields, validateSinglePostFields, pushNotificationFields, pushNotificationTokenFields }