const mongoose = require('mongoose');
const validator = require('validator');

const Card = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле обязательно к заполнению'],
    minlength: [2, 'Минимальное количество символов - 2'],
    maxlength: [30, 'Максимальное количество символов - 30'],
  },
  link: {
    type: String,
    required: [true, 'Поле обязательно к заполнению'],
    validate: { validator: (mail) => validator.isURL(mail), message: 'Неверный email' },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', Card);
