const admin = require("firebase-admin")
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
module.exports = { uploadImage }
