const User = require('../models/user');

const CODE_OK = 200;
const CODE_SUCCESS = 201;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const SERVER_ERROR = 500;

module.exports.getUser = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(SERVER_ERROR).send({ message: 'Произошла ошибка!' }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(CODE_SUCCESS).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Данные переданы неверно' });
      } else { res.status(SERVER_ERROR).send({ message: 'Произошла ошибка!' }); }
    });
};

module.exports.getUserId = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(new Error('NotFound'))
    .then((user) => res.status(CODE_OK).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST).send({ message: 'Данные переданы неверно' });
      } if (err.message === 'NotFound') {
        return res.status(NOT_FOUND).send({ message: 'Пользователь не найден' });
      }
      return res.status(SERVER_ERROR).send({ message: 'Произошла ошибка!' });
    });
};

module.exports.changeUserInfo = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.status(CODE_OK).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return res.status(BAD_REQUEST).send({ message: 'Данные переданы неверно' });
      }
      return res.status(SERVER_ERROR).send({ message: 'Произошла ошибка!' });
    });
};

module.exports.changeAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.status(CODE_OK).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Данные переданы неверно' });
      } else { res.status(SERVER_ERROR).send({ message: 'Произошла ошибка!' }); }
    });
};
