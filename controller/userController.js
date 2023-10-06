const { auth, firestore } = require("firebase-admin")
const { addUserProfilePhoto } = require("../helper/helperFunction")
const userRegister = async (req, res) => {
  const { firstName, lastName, mobileNo, email, password, profilePhoto, confirmPassword } = req.body;
  if (!firstName || !lastName || !mobileNo || !email || !password || !confirmPassword || !profilePhoto) {
    res.status(404).send({ message: "Please fill all the required fields" })
  } else if (password != confirmPassword) {
    res.status(401).send({ message: "Password and confirmPassword should be same" })
  }
  try {
    const newUser = await auth().createUser({
      email, password
    })
    await firestore().collection("users").doc(newUser.uid).set({
      firstName, lastName, mobileNo
    })
    await addUserProfilePhoto(profilePhoto, newUser.uid);
    res.status(200).send({ message: "User created and data uploaded successfully", newUser })
  } catch (err) {
    res.status(500).send(err.message)
  }
}
module.exports = { userRegister }