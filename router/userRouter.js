const router = require("express").Router();
const { validateFields, validatePostFields, validateFieldErrors } = require("../middlewares/userMiddleWare")
const userController = require("../controller/userController")
const postController = require("../controller/postController")
const { uploadImageToFirebase } = require("../controller/uploadImage");
const { header } = require("express-validator");
router.post("/register", validateFields, userController.userRegister)
router.post("/create-user-firebase-token", userController.createFirebaseToken)
router.post("/update-user", userController.updateUserDetails)
router.post("/create-new-post", [validatePostFields, validateFieldErrors], postController.createPost)
router.post("/upload-image", [[header("uid").notEmpty()], validateFieldErrors, uploadImageToFirebase.single("image")], userController.uploadImage)
module.exports = router;