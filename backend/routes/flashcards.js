const express = require('express');
const router = express.Router();

//Getting all flashcards
router.get('/', async (req, res) => {
  const Flashcard = res.locals.models.flashcard;
  const flashcard = await Flashcard.find().sort('level');
  res.send(flashcard);
});

module.exports = router;
