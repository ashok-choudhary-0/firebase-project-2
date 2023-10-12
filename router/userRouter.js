const router = require("express").Router();
const { validateFields, validatePostFields, validateFieldErrors, validateTagUserFields } = require("../middlewares/userMiddleWare")
const userController = require("../controller/userController")
const postController = require("../controller/postController")
const { uploadImageToFirebase } = require("../controller/uploadImage");
const { header, param, query, body } = require("express-validator");
const uploadImageController = require("../controller/uploadImageController")
router.post("/register", validateFields, userController.userRegister)
router.post("/create-user-firebase-token", userController.createFirebaseToken)
router.post("/update-user", userController.updateUserDetails)
router.post("/create-new-post", [validatePostFields, validateFieldErrors], postController.createPost)
router.post("/upload-image", [[header("uid").notEmpty()], validateFieldErrors, uploadImageToFirebase.single("image")], uploadImageController.uploadImage)
router.post("/tag-user", [validateTagUserFields, validateFieldErrors], postController.tagUser)
router.post("/remove-tag-user", [validateTagUserFields, validateFieldErrors], postController.removeTagUser)
router.get("/all-posts/:page", [[param("page").isInt().custom((val) => { return val > 0 }).withMessage("page cant be less then one"), query("limit").isInt().custom((val) => { return val > 0 }).withMessage("limit cant be less then one")], validateFieldErrors], postController.allPosts)
router.post("/add-comment", [[body("commentTitle").notEmpty(), body("userUid").notEmpty(), body("postUid").notEmpty()], validateFieldErrors], postController.addComment)
router.delete("/delete-comment", [[body("postUid").notEmpty(), body("commentUid").notEmpty()], validateFieldErrors], postController.deleteComment)
router.patch("/edit-comment", [[body("postUid").notEmpty(), body("commentUid").notEmpty(), body("commentTitle").notEmpty()], validateFieldErrors], postController.editComment)
module.exports = router;