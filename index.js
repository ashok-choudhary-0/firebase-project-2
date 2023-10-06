const express = require("express")
require("dotenv").config();
const bodyParser = require("body-parser")
const userRouter = require("./router/userRouter")
const firebase = require("./config/firebaseConfig")
const port = process.env.port || 5000;
const app = express();
app.use(bodyParser.json())
app.use("/user", userRouter)
app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})