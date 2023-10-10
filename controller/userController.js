const { auth, firestore } = require("firebase-admin")
const { validationResult, matchedData } = require('express-validator');
const admin = require("firebase-admin")
const userRegister = async (req, res) => {
  const validateFieldErrors = validationResult(req);
  if (!validateFieldErrors.isEmpty()) {
    res.status(404).send({ validateFieldErrors });
    return;
  }
  const bodyData = matchedData(req);
  try {
    const newUser = await auth().createUser({
      email: bodyData.email, password: bodyData.password
    })
    await firestore().collection("users").doc(newUser.uid).set({
      firstName: bodyData.firstName, lastName: bodyData.lastName, mobileNo: bodyData.mobileNo
    })
    res.status(200).send({ message: "User created and data uploaded successfully", newUser })
  } catch (err) {
    res.status(500).send(err.message)
  }
}
const createFirebaseToken = async (req, res) => {
  const { uid } = req.headers;
  try {
    const userFirebaseToken = await auth().createCustomToken(uid);
    res.status(200).send(userFirebaseToken);
  } catch (err) {
    res.status(500).send(err.message)
  }
}
const updateUserDetails = async (req, res) => {
  const { firstName, lastName, mobileNo } = req.body;
  const { uid } = req.headers;
  try {
    await admin.firestore().collection('users').doc(uid).update({ firstName, lastName, mobileNo });
    res.status(200).send({ message: "User data updated successfully" })
  } catch (err) {
    res.status(500).send(err.message)
  }
}

const uploadImage = async (req, res) => {
  const { uid } = req.headers;
  const file = req.file;
  if (!uid) {
    res.status(404).send({ message: "Uid not found" })
    return;
  }
  try {
    const fileName = Date.now() + '-' + file.originalname
    const bucket = admin.storage().bucket();
    const fileRef = bucket.file(`images/${uid}/${fileName}`);
    await fileRef.save(file.buffer, {
      metadata: {
        contentType: file.mimetype,
      },
    });
    const imageDownloadURL = await fileRef.getSignedUrl({
      action: 'read',
      expires: '01-01-2040',
    });
    res.status(200).send({ message: "Image uploaded successfully", imageDownloadURL })
  } catch (err) {
    res.status(500).send(err.message)
  }
}

module.exports = { userRegister, createFirebaseToken, updateUserDetails, uploadImage }