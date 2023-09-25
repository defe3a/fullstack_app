require("mongoose");
const Usr = require("../models/users");
const jwt = require("jsonwebtoken");
const secret_key = process.env.SECRET_KEY;

const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const cryptoPass = require("crypto")
    .createHash("sha256")
    .update(password)
    .digest("hex");

  const result = await Usr.findOne({
    email: email,
    isActive: true,
    password: cryptoPass,
  });

  if (result) {
    // retorno token
    const token = jwt.sign({ user: result }, secret_key, { expiresIn: "1h" });

    res.status(200).json(token);
  } else {
    res.status(401).send("No puede estar aqui");
  }
};

module.exports = { login };
