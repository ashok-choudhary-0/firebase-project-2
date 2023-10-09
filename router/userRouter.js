const router = require("express").Router();
const { validateFields } = require("../middlewares/userMiddleWare")
const userController = require("../controller/userController")
router.post("/register", validateFields, userController.userRegister)
router.post("/create-user-firebase-token", userController.createFirebaseToken)
router.post("/update-user", userController.updateUserDetails)
module.exports = router;