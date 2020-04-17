const express = require('express');
const router = express.Router();

const { validatePlant } = require('../models/plant');

//Creating new plant
router.post('/', async (req, res) => {
  const Plant = res.locals.models.plant;

  const { error } = validatePlant(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let plant = new Plant(req.body);
  await plant.save();
  res.send(plant);
});

//Getting plant by ID
router.get('/:id', async (req, res) => {
  const Plant = res.locals.models.plant;

  const plant = await Plant.findById(req.params.id);
  if (!plant) res.status(404).send(`Plant with id ${req.params.id} not found!`);
  res.send(plant);
});

module.exports = router;
