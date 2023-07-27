const Card = require('../models/card');
const NotFound = require('../errors/NotFound (404)');
const Forbidden = require('../errors/Forbidden (403)');
const BadRequest = require('../errors/BadRequest (400)');

const CODE_OK = 200;
const CODE_SUCCESS = 201;

module.exports.getCard = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(CODE_OK).send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const { userId } = req.user;
  Card.create({ name, link, owner: userId })
    .then((card) => res.status(CODE_SUCCESS).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Данные переданы неверно'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const { userId } = req.user;
  return Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFound('Карточка не найдена');
      }
      const { owner: cardOwnerId } = card;
      if (cardOwnerId.valueOf() !== userId) {
        throw new Forbidden('Нет прав доступа');
      }
      return Card.findByIdAndDelete(cardId);
    })
    .then((deletedCard) => {
      if (!deletedCard) {
        throw new NotFound('Карточка уже была удалена');
      }
      res.send({ data: deletedCard });
    })
    .catch(next);
};

module.exports.putLike = (req, res, next) => {
  const { cardId } = req.params;
  const { userId } = req.user;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true },
  ).then((card) => {
    if (card) return res.send({ data: card });
    throw new NotFound('Карточка не найдена');
  })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequest('Данные переданы неверно'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteLike = (req, res, next) => {
  const { cardId } = req.params;
  const { userId } = req.user;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
    { new: true },
  )
    .then((card) => {
      if (card) return res.send({ data: card });
      throw new NotFound('Карточка не найдена');
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequest('Данные переданы неверно'));
      } else {
        next(err);
      }
    });
};
