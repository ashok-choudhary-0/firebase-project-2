const { storage, firestore } = require("firebase-admin")
const addUserProfilePhoto = async (file, userId, folderName) => {
  const date = Date.now();
  const fileName = `${date}${file}`
  const bucket = storage().bucket();
  return bucket.upload(file, { destination: `${folderName}/${userId}/${fileName}` })
}
const getCollectionData = async (collection) => {
  return await firestore().collection(collection).get();
}
module.exports = { addUserProfilePhoto, getCollectionData };