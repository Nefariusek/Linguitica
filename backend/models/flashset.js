const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const flashsetSchema = new mongoose.Schema({
  flashcards: {
    type: Object,
    default: [],
    ref: 'Flashcard',
  },
});

const validateFlashset = flashset => {
  const schema = Joi.object({
    flashcards: Joi.array().items(Joi.object()),
  });

  return schema.validate(flashset);
};

exports.flashset = flashsetSchema;
exports.validateFlashset = validateFlashset;
