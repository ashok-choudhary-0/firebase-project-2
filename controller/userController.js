const { auth, firestore } = require("firebase-admin")
const { addUserProfilePhoto } = require("../helper/helperFunction")
const { validationResult, matchedData } = require('express-validator');
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
  const { user_id } = req.headers;
  try {
    const userToken = await auth().createCustomToken(user_id);
    res.status(200).send(userToken);
  } catch (err) {
    res.status(500).send(err.message)
  }
}
module.exports = { userRegister, createFirebaseToken }