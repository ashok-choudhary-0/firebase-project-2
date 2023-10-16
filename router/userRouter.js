const router = require("express").Router();
const { validateFields, validatePostFields, validateFieldErrors, validateTagUserFields, validateAddCommentFields, validateDeleteCommentFields, validateEditCommentFields, validateSinglePostFields, pushNotificationFields, pushNotificationToken, pushNotificationTokenFields } = require("../middlewares/userMiddleWare")
const userController = require("../controller/userController")
const postController = require("../controller/postController")
const { uploadImageToFirebase } = require("../controller/uploadImage");
const { header, param, query } = require("express-validator");
const uploadImageController = require("../controller/uploadImageController")
router.post("/register", validateFields, userController.userRegister)
router.post("/create-user-firebase-token", userController.createFirebaseToken)
router.post("/update-user", userController.updateUserDetails)
router.post("/save-user-notification-token", [pushNotificationTokenFields, validateFieldErrors], userController.saveUserNotificationToken)
router.post("/create-new-post", [validatePostFields, validateFieldErrors], postController.createPost)
router.post("/upload-image", [[header("uid").notEmpty()], validateFieldErrors, uploadImageToFirebase.single("image")], uploadImageController.uploadImage)
router.post("/tag-user", [validateTagUserFields, validateFieldErrors], postController.tagUser)
router.post("/remove-tag-user", [validateTagUserFields, validateFieldErrors], postController.removeTagUser)
router.get("/all-posts/:page", [[param("page").isInt().custom((val) => { return val > 0 }).withMessage("page cant be less then one"), query("limit").isInt().custom((val) => { return val > 0 }).withMessage("limit cant be less then one")], validateFieldErrors], postController.allPosts)
router.post("/add-comment", [validateAddCommentFields, validateFieldErrors], postController.addCommentOnPost)
router.delete("/delete-comment", [validateDeleteCommentFields, validateFieldErrors], postController.deleteCommentOnPost)
router.patch("/edit-comment", [validateEditCommentFields, validateFieldErrors], postController.editCommentOnPost)
router.get("/get-single-post", [validateSinglePostFields, validateFieldErrors], postController.getSinglePost)

module.exports = router;