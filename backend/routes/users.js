const express = require('express');
const router = express.Router();

const { validateUser } = require('../models/user');

//Creating new user
router.post('/', async (req, res) => {
  const User = res.locals.models.user;

  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = new User(req.body);
  await user.save();
  res.send(user);
});

//Getting all users
router.get('/', async (req, res) => {
  const User = res.locals.models.user;
  const user = await User.find().sort('username');
  res.send(user);
});

//Getting user by ID
router.get('/:id', async (req, res) => {
  const User = res.locals.models.user;

  const user = await User.findById(req.params.id);
  if (!user) res.status(404).send(`Plant with id ${req.params.id} not found!`);
  res.send(user);
});

//Updating password
router.put('/:id/password', async (req, res) => {
  const User = res.locals.models.user;
  // const { error } = validateUser(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  let user;

  user = await User.findByIdAndUpdate(
    req.params.id,
    {
      password: req.body.password,
    },
    {
      new: true,
    },
  );

  if (!user) return res.status(404).send('The user with the given ID was not found.');

  res.send('Password changed');
});

//Updating email
router.put('/:id/email', async (req, res) => {
  const User = res.locals.models.user;
  // const { error } = validateUser(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  let user;

  user = await User.findByIdAndUpdate(
    req.params.id,
    {
      email: req.body.email,
    },
    {
      new: true,
    },
  );

  if (!user) return res.status(404).send('The user with the given ID was not found.');

  res.send('E-mail changed');
});

module.exports = router;
