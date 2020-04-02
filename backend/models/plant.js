const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const plantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 16,
    trim: true,
  },
  species: {
    type: String,
    enum: ['', 'Bonsai', 'Cactus', 'Rose', 'Dandelion'],
    default: '',
  },
  level: {
    type: Number,
    default: 1,
  },
  irrigation_points: {
    type: Number,
    default: 0,
  },
  irrigation_required: {
    type: Number,
    default: 0,
  },
  toughness: {
    type: Number,
    default: 0,
  },
  charmingness: {
    type: Number,
    default: 0,
  },
  health: {
    type: Number,
    default: 0,
  },
  max_health: {
    type: Number,
    default: 0,
  },
  quests: {
    type: [ObjectId],
    default: [],
    ref: 'Quest',
  },
  statistics_id: {
    type: ObjectId,
    required: true,
    ref: 'Statistics',
  },
});

const validatePlant = plant => {
  const schema = Joi.object({
    name: Joi.string()
      .required()
      .min(5)
      .max(16)
      .trim(),
    species: Joi.valid('Bonsai', 'Cactus', 'Rose', 'Dandelion'),
    level: Joi.number().min(0),
    irrigation_points: Joi.number().min(0),
    irrigation_required: Joi.number().min(0),
    toughness: Joi.number().min(0),
    charmingness: Joi.number().min(0),
    health: Joi.number().min(0),
    max_health: Joi.number().min(0),
    quests: Joi.array().items(Joi.objectId()),
    statistics_id: Joi.objectId().required(),
  });

  return schema.validate(plant);
};

exports.plant = plantSchema;
exports.validatePlant = validatePlant;
