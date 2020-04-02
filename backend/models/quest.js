const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const questSchema = new mongoose.Schema({
  goal: {
    type: String,
    required: true,
    maxlength: 255,
  },
  category: {
    type: String,
    //enum: [TODO],
    //default: ''
  },
  status: {
    type: String,
    enum: ['', 'in_progress', 'failed', 'completed'],
    default: '',
  },
  finish_date: {
    type: Date,
    default: Date.now,
  },
  duration: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    default: '',
    maxlength: 420,
  },
  priority: {
    type: Number,
    enum: [0, 1, 2, 3, 4, 5],
  },
  is_requrring: {
    type: Boolean,
    default: false,
  },
  flashset_id: {
    type: [ObjectId],
    required: true,
    ref: 'Flashset',
  },
});

const validateQuest = quest => {
  const schema = Joi.object({
    goal: Joi.string()
      .required()
      .max(255),
    category: Joi.string(), //.valid()
    status: Joi.string().valid('in_progress', 'failed', 'completed'),
    finish_date: Joi.date(),
    duration: Joi.number().min(0),
    description: Joi.string().max(420),
    priority: Joi.number().valid(0, 1, 2, 3, 4, 5),
    is_requrring: Joi.boolean(),
    flashset_id: Joi.array().items(Joi.objectId()),
  });

  return schema.validate(quest);
};

exports.quest = questSchema;
exports.validateQuest = validateQuest;
