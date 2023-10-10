const { matchedData, validationResult } = require("express-validator");
const { firestore } = require("firebase-admin");
const slugify = require('slugify')
const createPost = async (req, res) => {
  const { description, title, uid } = matchedData(req);
  try {
    await firestore().collection("posts").add({
      title: title, description: description, slug: slugify(title), updatedAt: new Date(), createdAt: new Date(), updatedBy: uid
    })
    res.status(200).send({ message: "Post created successfully" })
  } catch (err) {
    res.status(500).send(err.message)
  }
}
const tagUser = async (req, res) => {
  const { postUid, userUid } = req.body;
  const validateFieldErrors = validationResult(req);
  if (!validateFieldErrors.isEmpty()) {
    res.status(404).send({ validateFieldErrors })
    return;
  }
  try {
    await firestore().collection("posts").doc(postUid).collection("tagUsers").add({ userUid })
    res.status(200).send({ message: "User tagged this post successfully" })
  } catch (err) {
    res.status(500).send(err.message)
  }
}
module.exports = { createPost, tagUser }