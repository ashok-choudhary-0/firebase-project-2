const { storage } = require("firebase-admin")
const addUserProfilePhoto = async (file, userId) => {
  const date = Date.now();
  const fileName = `${date}${file}`
  const bucket = storage().bucket();
  return bucket.upload(file, { destination: `${userId}/${fileName}` })
}
module.exports = { addUserProfilePhoto };