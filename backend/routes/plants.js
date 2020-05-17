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

//Update name
router.put('/:id/name', async (req, res) => {
  const Plant = res.locals.models.plant;

  let plant;

  plant = await Plant.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    {
      new: true,
    },
  );

  if (!plant) return res.status(404).send('Plant with the given ID was not found.');

  res.send('Plant name changed');
});

//Update level
router.put('/:id/level', async (req, res) => {
  const Plant = res.locals.models.plant;

  let plant;

  plant = await Plant.findByIdAndUpdate(
    req.params.id,
    {
      level: req.body.level,
    },
    {
      new: true,
    },
  );

  if (!plant) return res.status(404).send('Plant with the given ID was not found.');

  res.send('Plant level changed');
});

//Update irrigation points
router.put('/:id/irrigationPoints', async (req, res) => {
  const Plant = res.locals.models.plant;

  let plant;

  plant = await Plant.findByIdAndUpdate(
    req.params.id,
    {
      irrigation_points: req.body.irrigation_points,
    },
    {
      new: true,
    },
  );

  if (!plant) return res.status(404).send('Plant with the given ID was not found.');

  res.send('Plant irrigation points changed');
});

//update health
router.put('/:id/health', async (req, res) => {
  const Plant = res.locals.models.plant;

  let plant;

  plant = await Plant.findByIdAndUpdate(
    req.params.id,
    {
      health: req.body.health,
    },
    {
      new: true,
    },
  );

  if (!plant) return res.status(404).send('Plant with the given ID was not found.');

  res.send('Plant health changed');
});
/*
//update flashsets
router.put('/:id/flashsets', async (req, res) => {
  const Plant = res.locals.models.plant;

  let plant;

  plant = await Plant.findByIdAndUpdate(
    req.params.id,
    {
      $push: { flashsets: req.body.flashsets },
    },
    {
      new: true,
    },
  );

  if (!plant) return res.status(404).send('Plant with the given ID was not found.');

  res.send('Plant flashsets changed');
});
*/

router.put('/:id/flashsets', async (req, res) => {
  const Plant = res.locals.models.plant;

  const plant = await Plant.findById(req.params.id);
  if (!plant) res.status(404).send(`Plant with id ${req.params.id} not found!`);
  res.send(plant);

  plant.flashsets.push(req.body.flashsets);

  let plantt;

  plantt = await Plant.findByIdAndUpdate(
    req.params.id,
    {
      flashsets: plant.flashsets,
    },
    {
      new: true,
    },
  );

  if (!plantt) return res.status(404).send('Plant with the given ID was not found.');

  res.send(plantt);
});

//update quest
router.put('/:id/quests', async (req, res) => {
  const Plant = res.locals.models.plant;

  const plant = await Plant.findById(req.params.id);
  if (!plant) res.status(404).send(`Plant with id ${req.params.id} not found!`);
  res.send(plant);

  plant.quests.push(req.body.quests);

  let plantt;

  plantt = await Plant.findByIdAndUpdate(
    req.params.id,
    {
      quests: plant.quests,
    },
    {
      new: true,
    },
  );

  if (!plantt) return res.status(404).send('Plant with the given ID was not found.');

  res.send(plantt);
});

module.exports = router;
