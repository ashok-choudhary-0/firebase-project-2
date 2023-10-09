const router = require("express").Router();
const { validateFields, validatePostFields } = require("../middlewares/userMiddleWare")
const userController = require("../controller/userController")
router.post("/register", validateFields, userController.userRegister)
router.post("/create-user-firebase-token", userController.createFirebaseToken)
router.post("/update-user", userController.updateUserDetails)
router.post("/create-new-post", validatePostFields, userController.createPost)
module.exports = router;