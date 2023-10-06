const { storage } = require("firebase-admin")
const addProfilePhoto = async (file, userId) => {
  const date = Date.now();
  const fileName = `${date}${file}`
  const bucket = storage().bucket();
  return bucket.upload(file, { destination: `${userId}/${fileName}` })
}
module.exports = { addProfilePhoto };