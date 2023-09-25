const express = require("express");
const router = express.Router();
const userCharacter = require("../controllers/character");
const Middleware = require("../middleware/auth-middleware");

router.get("/character", Middleware.verify, userCharacter.getCharacters);
router.get(
  "/character/byUser",
  Middleware.verify,
  userCharacter.getCharactersByUserId
);

router.get("/character/lasts", userCharacter.getLastCharacters);
router.post("/character", Middleware.verify, userCharacter.createCharacter);
router.put("/character/:id", Middleware.verify, userCharacter.updateCharacter);

module.exports = router;
