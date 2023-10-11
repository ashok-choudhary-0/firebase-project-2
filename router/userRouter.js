const router = require("express").Router();
const { validateFields, validatePostFields, validateFieldErrors, validateTagUserFields } = require("../middlewares/userMiddleWare")
const userController = require("../controller/userController")
const postController = require("../controller/postController")
const { uploadImageToFirebase } = require("../controller/uploadImage");
const { header, body } = require("express-validator");
const uploadImageController = require("../controller/uploadImageController")
router.post("/register", validateFields, userController.userRegister)
router.post("/create-user-firebase-token", userController.createFirebaseToken)
router.post("/update-user", userController.updateUserDetails)
router.post("/create-new-post", [validatePostFields, validateFieldErrors], postController.createPost)
router.post("/upload-image", [[header("uid").notEmpty()], validateFieldErrors, uploadImageToFirebase.single("image")], uploadImageController.uploadImage)
router.post("/tag-user", [validateTagUserFields, validateFieldErrors], postController.tagUser)
router.post("/remove-tag-user", [validateTagUserFields, validateFieldErrors], postController.removeTagUser)
module.exports = router;