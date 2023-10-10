const router = require("express").Router();
const { validateFields, validatePostFields } = require("../middlewares/userMiddleWare")
const userController = require("../controller/userController")
const { uploadImageToFirebase } = require("../controller/uploadImage");
const { header, body } = require("express-validator");
router.post("/register", validateFields, userController.userRegister)
router.post("/create-user-firebase-token", userController.createFirebaseToken)
router.post("/update-user", userController.updateUserDetails)
router.post("/create-new-post", validatePostFields, userController.createPost)
router.post("/upload-image", [[header("uid").notEmpty()], uploadImageToFirebase.single("image")], userController.uploadImage)
module.exports = router;