const User = require('../models/user');

module.exports.getUser = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка!' }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Данные переданы неверно' });
      } else { res.status(500).send({ message: 'Произошла ошибка!' }); }
    });
};

module.exports.getUserId = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(new Error('NotFound'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Данные переданы неверно' });
      } if (err.message === 'NotFound') {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      return res.status(500).send({ message: 'Произошла ошибка!' });
    });
};

module.exports.changeUserInfo = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return res.status(400).send({ message: 'Данные переданы неверно' });
      }
      return res.status(500).send({ message: 'Произошла ошибка!' });
    });
};

module.exports.changeAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(400).send({ message: 'Данные переданы неверно' });
      } else { res.status(500).send({ message: 'Произошла ошибка!' }); }
    });
};
