const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const flashsetSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: 255,
    trim: true,
    required: true,
  },
  flashcards: {
    type: Object,
    default: [],
    ref: 'Flashcard',
  },
});

const validateFlashset = (flashset) => {
  const schema = Joi.object({
    title: Joi.string().max(255).required().trim(),
    flashcards: Joi.array().items(Joi.object()),
  });

  return schema.validate(flashset);
};

exports.flashset = flashsetSchema;
exports.validateFlashset = validateFlashset;
