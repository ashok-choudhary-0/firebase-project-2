const { auth, firestore } = require("firebase-admin")
const { validationResult, matchedData } = require('express-validator');
const admin = require("firebase-admin")
const slugify = require('slugify')
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
const createPost = async (req, res) => {
  const validateFieldErrors = validationResult(req);
  if (!validateFieldErrors.isEmpty()) {
    res.status(404).send({ validateFieldErrors })
    return;
  }
  const bodyData = matchedData(req);
  try {
    const user = await firestore().collection("users").doc(bodyData.uid).get();
    const createdAt = firestore.FieldValue.serverTimestamp()
    const slugUrl = `http://localhost:8000/user/create-new-post/${slugify(bodyData.slug)}`
    const newPost = await firestore().collection("posts").doc(bodyData.uid).set({
      title: bodyData.title, description: bodyData.description, slug: slugUrl, updatedAt: createdAt, createdAt, updatedBy: `${user._fieldsProto.firstName.stringValue} ${user._fieldsProto.lastName.stringValue}`
    })
    res.status(200).send({ message: "Post created successfully", newPost })
  } catch (err) {
    res.status(500).send(err.message)
  }
}
const uploadImage = async (req, res) => {
  const { uid } = req.headers;
  const file = req.file;
  const validateFieldErrors = validationResult(req);
  if (!validateFieldErrors.isEmpty()) {
    res.status(404).send({ validateFieldErrors })
    return;
  } else if (!uid) {
    res.status(404).send({ message: "Header uid not found" })
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
    const downloadURL = await fileRef.getSignedUrl({
      action: 'read',
      expires: '01-01-2040',
    });
    res.status(200).send({ message: "Image uploaded successfully", downloadURL })
  } catch (err) {
    res.status(500).send(err.message)
  }
}
module.exports = { userRegister, createFirebaseToken, updateUserDetails, createPost, uploadImage }