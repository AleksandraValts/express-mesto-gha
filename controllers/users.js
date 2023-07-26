const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const CODE_SUCCESS = 201;
const BadRequest = require('../errors/BadRequest (400)');
const Conflict = require('../errors/Conflict (409)');
const NotFound = require('../errors/NotFound (404)');
const Unauthorized = require('../errors/Unauthorized (401)');

module.exports.getUser = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;
  bcrypt.hash(password, 10).then((hash) => User.create({
    email, password: hash, name, about, avatar,
  }))
    .then((user) => {
      const { _id } = user;
      return res.status(CODE_SUCCESS).send({
        email, name, about, avatar, _id,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new Conflict('Пользователь уже существует'));
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Данные переданы неверно'));
      }
      return next(err);
    });
};

module.exports.getUserId = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (user) return res.send({ user });
      throw new NotFound('Пользователь не найден');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Данные переданы неверно'));
      } else {
        next(err);
      }
    });
};

module.exports.changeUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  const { userId } = req.user;
  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (user) return res.send({ user });
      throw new NotFound('Пользователь не найден');
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequest('Данные переданы неверно'));
      } else {
        next(err);
      }
    });
};

module.exports.changeAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const { userId } = req.user;
  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (user) return res.send({ user });
      throw new NotFound('Пользователь не найден');
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequest('Данные переданы неверно'));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then(({ _id: userId }) => {
      if (userId) {
        const token = jwt.sign(
          { userId },
          'supersecret-key-for-signing',
          { expiresIn: '7d' },
        );
        return res.send({ _id: token });
      }
      throw new Unauthorized('Неправильные почта или пароль');
    })
    .catch(next);
};

module.exports.getLogUser = (req, res, next) => {
  const { userId } = req.user;
  User.findById(userId)
    .then((user) => {
      if (user) return res.send({ user });
      throw new NotFound('Пользователь не найден');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Данные переданы неверно'));
      } else {
        next(err);
      }
    });
};
