const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");

router.get("/users", userController.getUsers);
router.post("/users", userController.createUsers);

module.exports = router;
