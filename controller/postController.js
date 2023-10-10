const { matchedData } = require("express-validator");
const { firestore } = require("firebase-admin");
const slugify = require('slugify')
const createPost = async (req, res) => {
  const bodyData = matchedData(req);
  try {
    const postDoc= firestore().collection("posts").doc()
    await postDoc.set({
      title: bodyData.title, description: bodyData.description, slug: slugify(bodyData.slug), updatedAt: new Date(), createdAt: new Date(), updatedBy: bodyData.uid
    })
    res.status(200).send({ message: "Post created successfully" })
  } catch (err) {
    res.status(500).send(err.message)
  }
}
module.exports = { createPost }