const { user } = require('../models/user');
const { plant } = require('../models/plant');
const { quest } = require('../models/quest');
const { flashset } = require('../models/flashset');
const { flashcard } = require('../models/flashcard');
const { statistics } = require('../models/statistics');

module.exports = {
  user,
  plant,
  quest,
  flashset,
  flashcard,
  statistics,
};
