const Card = require('../models/card');

const CODE_OK = 200;
const CODE_SUCCESS = 201;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const SERVER_ERROR = 500;

module.exports.getCard = (req, res) => {
  Card.find({})
    .then((cards) => res.status(CODE_OK).send(cards))
    .catch(() => res.status(SERVER_ERROR).send({ message: 'Произошла ошибка!' }));
};

module.exports.createCard = (req, res) => {
  console.log(req.user._id);
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(CODE_SUCCESS).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Данные переданы неверно' });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Произошла ошибка!' });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
      }
      return res.status(CODE_OK).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Данные переданы неверно' });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Произошла ошибка!' });
      }
    });
};

module.exports.putLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
      }
      return res.status(CODE_OK).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Данные переданы неверно' });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Произошла ошибка!' });
      }
    });
};

module.exports.deleteLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
      }
      return res.status(CODE_OK).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).send({ message: 'Данные переданы неверно' });
      }
      return res.status(SERVER_ERROR).send({ message: 'Произошла ошибка!' });
    });
};
