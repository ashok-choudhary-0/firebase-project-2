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
  try {
    await firestore().collection("posts").doc(postUid).collection("tagUsers").add({ userUid })
    res.status(200).send({ message: "User tagged on this post successfully" })
  } catch (err) {
    res.status(500).send(err.message)
  }
}
const removeTagUser = async (req, res) => {
  const { postUid, userUid } = req.body;
  try {
    await firestore().collection("posts").doc(postUid).collection("tagUsers").doc(userUid).delete()
    res.status(200).send({ message: "User tagged remove from this post." })
  } catch (err) {
    res.status(500).send(err.message)
  }
}
const allPosts = async (req, res) => {
  const page = +(req.params.page);
  const limit = +(req.query.limit);
  try {
    const postsRef = firestore().collection('posts');
    const snapshot = await postsRef
      .limit(limit)
      .offset((page - 1) * limit)
      .get();
    const allPosts = [];
    for (const doc of snapshot.docs) {
      const dataPost = doc.data();
      dataPost.id = doc.id;
      dataPost.tagUser = [];
      const tagRef = firestore().collection(`posts/${doc.id}/tagUsers`);
      const tagSnapshot = await tagRef.get();
      tagSnapshot.forEach(tagDoc => {
        dataPost.tagUser.push(tagDoc.data().userUid);
      });
      allPosts.push(dataPost);
    }
    if (allPosts.length === 0) {
      return res.status(200).send({ message: "Opps no data found on this page, please visit previous pages" })
    }
    res.status(200).send(allPosts)
  } catch (err) {
    res.status(500).send(err.message)
  }
}
const addCommentOnPost = async (req, res) => {
  const { userUid, commentTitle, postUid } = matchedData(req);
  const postRef = firestore().collection(`posts`).doc(postUid)
  try {
    const postData = await postRef.get();
    if (postData.exists) {
      await postRef.collection("comments").add({ userUid, commentTitle, createdAt: new Date(), updatedAt: new Date() })
      return res.status(200).send({ message: "You commented successfully on this post" })
    }
    res.status(200).send({ message: "No post found on this postUid" })
  } catch (err) {
    res.status(500).send(err.message)
  }
}
const deleteCommentOnPost = async (req, res) => {
  const { postUid, commentUid } = matchedData(req);
  try {
    await firestore().collection(`posts`).doc(postUid).collection("comments").doc(commentUid).delete()
    res.status(200).send({ message: "Comment deleted successfully" })
  } catch (err) {
    res.status(500).send(err)
  }
}
const editCommentOnPost = async (req, res) => {
  const { postUid, commentUid, commentTitle } = matchedData(req);
  try {
    await firestore().collection(`posts`).doc(postUid).collection("comments").doc(commentUid).update({
      commentTitle, updatedAt: new Date()
    })
    res.status(200).send({ message: "Comment edited successfully" })
  } catch (err) {
    res.status(500).send(err)
  }
}
module.exports = { createPost, tagUser, removeTagUser, allPosts, addCommentOnPost, deleteCommentOnPost, editCommentOnPost }