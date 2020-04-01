const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const flashcardSchema = new mongoose.Schema({
  polish: {
    type: String,
    maxlength: 255,
    required: true,
    trim: true,
  },
  german: {
    type: String,
    maxlength: 255,
    required: true,
    trim: true,
  },
  polish_tips: {
    type: String,
    maxlength: 255,
    required: true,
    trim: true,
  },
  german_tips: {
    type: String,
    maxlength: 255,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    //enum: [''],
    //default: ''
  },
  tags: {
    type: [String],
    default: [''],
  },
  level: {
    type: String,
    enum: ['', 'elementary', 'intermediate', 'advanced'],
    default: '',
  },
});

const validateFlashcard = flashcard => {
  const schema = Joi.object({
    polish: Joi.string()
      .max(255)
      .required()
      .trim(),
    german: Joi.string()
      .max(255)
      .required()
      .trim(),
    polish_tips: Joi.string()
      .max(255)
      .required()
      .trim(),
    german_tips: Joi.string()
      .max(255)
      .required()
      .trim(),
    category: Joi.string(), //valid()
    tags: Joi.array().items(Joi.string()),
    level: Joi.string().valid('elementary', 'intermediate', 'advanced'),
  });

  return schema.validate(flashcard);
};

exports.flashcard = flashcardSchema;
exports.validateFlashcard = validateFlashcard;
