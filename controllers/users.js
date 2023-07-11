const User = require('../models/user');

module.exports.getUser = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400)
          .send({ message: 'Невозможно создать пользователя' });
      } else { res.status(500).send({ message: err.message }); }
    });
};

module.exports.getUserId = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(404)
          .send({ message: 'Пользователь не найден' });
      } else { res.status(500).send({ message: err.message }); }
    });
};

module.exports.changeUserInfo = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Невозможно обновить профиль' });
      } else if (err.name === 'CastError') {
        res.status(404).send({ message: 'Карточка не найдена' });
      } else { res.status(500).send({ message: err.message }); }
    });
};

module.exports.changeAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Невозможно обновить аватар' });
      } else if (err.name === 'CastError') {
        res.status(404).send({ message: 'Пользователь не найден' });
      } else { res.status(500).send({ message: err.message }); }
    });
};
