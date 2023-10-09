const { auth, firestore } = require("firebase-admin")
const { addUserProfilePhoto } = require("../helper/helperFunction")
const { validationResult, matchedData } = require('express-validator');
const admin = require("firebase-admin")
const userRegister = async (req, res) => {
  const validateFieldErrors = validationResult(req);
  if (!validateFieldErrors.isEmpty()) {
    res.status(404).send({ validateFieldErrors })
  }
  const bodyData = matchedData(req);
  try {
    const newUser = await auth().createUser({
      email: bodyData.email, password: bodyData.password
    })
    await firestore().collection("users").doc(newUser.uid).set({
      firstName: bodyData.firstName, lastName: bodyData.lastName, mobileNo: bodyData.mobileNo
    })
    await addUserProfilePhoto(bodyData.profilePhoto, newUser.uid);
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
module.exports = { userRegister, createFirebaseToken, updateUserDetails }