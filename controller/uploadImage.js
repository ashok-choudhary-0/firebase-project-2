const multer = require('multer')
const uploadImageToFirebase = multer({ storage: multer.memoryStorage() })
module.exports = { uploadImageToFirebase }