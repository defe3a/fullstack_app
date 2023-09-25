const express = require("express");
const app = express();
const mongoose = require("mongoose");
const http = require("http").createServer(app);
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const uri = process.env.MONGO_URI;
const users = require("./routes/users");
const characters = require("./routes/character");
const auth = require("./routes/auth");

app.use(express.json());

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected");
  })
  .catch((err) => console.log(err));

app.use("/api", users, characters, auth);

http.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});
