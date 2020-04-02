const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const statisticsSchema = new mongoose.Schema({
  words_learned: {
    type: Number,
    default: 0,
  },
  quest_completed: {
    type: Number,
    default: 0,
  },
  tests_passed: {
    type: Number,
    default: 0,
  },
  streak: {
    type: Number,
    default: 0,
  },
  learning_since: {
    type: Date,
    default: Date.now,
  },
});

const validateStatistics = statistics => {
  const schema = Joi.object({
    words_learned: Joi.number().min(0),
    quest_completed: Joi.number().min(0),
    tests_passed: Joi.number().min(0),
    streak: Joi.number(),
    learning_since: Joi.date(),
  });

  return schema.validate(statistics);
};

exports.statistics = statisticsSchema;
exports.validateStatistics = validateStatistics;
