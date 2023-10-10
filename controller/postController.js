const { matchedData } = require("express-validator");
const { firestore } = require("firebase-admin");
const slugify = require('slugify')
const createPost = async (req, res) => {
  const { description, slug, title, uid } = matchedData(req);
  try {
    await firestore().collection("posts").add({
      title: title, description: description, slug: slugify(slug), updatedAt: new Date(), createdAt: new Date(), updatedBy: uid
    })
    res.status(200).send({ message: "Post created successfully" })
  } catch (err) {
    res.status(500).send(err.message)
  }
}
module.exports = { createPost }