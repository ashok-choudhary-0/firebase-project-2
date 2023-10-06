const router = require("express").Router();
const { validateFields } = require("../middlewares/userMiddleWare")
const userController = require("../controller/userController")
router.post("/register", validateFields, userController.userRegister)
module.exports = router;