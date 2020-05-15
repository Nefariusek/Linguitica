const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');

const router = express.Router();
const { validateUser } = require('../models/user');

//Creating new user
router.post('/', async (req, res) => {
  const User = res.locals.models.user;
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('This email is already in use.');

  user = new User(_.pick(req.body, ['username', 'email', 'password']));
  const salt = await bcrypt.genSalt();
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  const token = user.generateAuthToken();

  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'username', 'email']));
});

//Getting all users
router.get('/', async (req, res) => {
  const User = res.locals.models.user;
  const user = await User.find().sort('username');
  res.send(user);
});

router.get('/userInfo', auth, async (req, res) => {
  const User = res.locals.models.user;

  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).send('The user with the given ID was not found.');

  res.send(_.pick(user, ['_id', 'username', 'email', 'plant_id']));
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

router.put('/:id/plant_id', (req, res) => {
  const User = res.locals.models.user;
  getUsers(User, req.params.id).then((result) => {
    if (!result) {
      res.status(404).send(`User with this id: ${req.params.id} not found`);
    } else {
      User.findByIdAndUpdate(
        req.params.id,
        {
          plant_id: req.body.plant_id,
        },
        {
          new: true,
        },
      ).then(
        (r) => {
          res.send('PlantID updated!');
        },
        (err) => {
          res.status(403).send('Bad request!');
        },
      );
    }
  });
});

getUsers = async (User, id) => {
  if (id) {
    return await User.find({
      _id: id,
    }).then(
      (result) => {
        return result[0];
      },
      (err) => console.log('Error', err),
    );
  } else {
    return await User.find().then(
      (result) => {
        return result;
      },
      (err) => console.log('Error', err),
    );
  }
};

module.exports = router;
