const express = require('express');
const router = express.Router();

const { validateQuest } = require('../models/quest');

//Creating new quest
router.post('/', async (req, res) => {
  const Quest = res.locals.models.quest;

  const { error } = validateQuest(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let quest = new Quest(req.body);
  await quest.save();
  res.send(quest);
});

//Getting quest by ID
router.get('/:id', async (req, res) => {
  const Quest = res.locals.models.quest;

  const quest = await Quest.findById(req.params.id);
  if (!quest) res.status(404).send(`Quest with id ${req.params.id} not found!`);
  res.send(quest);
});

//Getting all quests
router.get('/', async (req, res) => {
  const Quest = res.locals.models.quest;
  const quest = await Quest.find().sort('category');
  res.send(quest);
});

//Updating quest ... [TODO]

module.exports = router;
