const express = require('express');
const router = express.Router();

const { validateFlashset } = require('../models/flashset');

//Creating new flashset
router.post('/', async (req, res) => {
  const Flashset = res.locals.models.flashset;

  const { error } = validateFlashset(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let flashset = new Flashset(req.body);
  await flashset.save();
  res.send(flashset);
});

//Getting flashset by ID
router.get('/:id', async (req, res) => {
  const Flashset = res.locals.models.flashset;

  const flashset = await Flashset.findById(req.params.id);
  if (!flashset) res.status(404).send(`Flashset with id ${req.params.id} not found!`);
  res.send(flashset);
});

//Getting all flashsets
router.get('/', async (req, res) => {
  const Flashset = res.locals.models.flashset;
  const flashset = await Flashset.find().sort('flashcards');
  res.send(flashset);
});

//Deleting flashset
router.delete('/:id', async (req, res) => {
  const Flashset = res.locals.models.flashset;
  let flashset = await Flashset.findByIdAndRemove(req.params.id, (err) => {
    if (err) res.status(404).send(err);
  });
  res.send(`Flashset with id ${req.params.id} deleted`);
});

//Update flashset
router.put('/:id', async (req, res) => {
  const Flashset = res.locals.models.flashset;

  let flashset;

  flashset = await Flashset.findByIdAndUpdate(
    req.params.id,
    {
      flashcards: req.body.flashcards,
    },
    {
      new: true,
    },
  );

  if (!flashset) return res.status(404).send('Flashset with the given ID was not found.');

  res.send('Flashset changed');
});

//creating flashcard in flashset
router.put('/:id/flashcards', async (req, res) => {
  const Flashset = res.locals.models.flashset;

  const flashset = await Flashset.findById(req.params.id);
  if (!flashset) res.status(404).send(`Flashset with id ${req.params.id} not found!`);
  res.send(flashset);

  flashset.flashcards.push(req.body.flashcards);

  let flashsett;

  flashsett = await Flashset.findByIdAndUpdate(
    req.params.id,
    {
      flashcards: flashset.flashcards,
    },
    {
      new: true,
    },
  );

  if (!flashsett) return res.status(404).send('Flashset with the given ID was not found.');

  res.send(flashset);
});
module.exports = router;
