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
  return Card.findById(cardId)
    .orFail(() => {
      throw new NotFound('Карточка не найдена');
    })
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        return next(new Forbidden('Ошибка прав доступа'));
      }
      return card.remove().then(() => res.send({ message: 'Удалено' }));
    })
    .catch(next);
};

module.exports.putLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).orFail(() => {
    throw new NotFound('ID не найден');
  })
    .then((card) => res.status(CODE_OK).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequest('Данные переданы неверно');
      }
      if (err.message === 'NotFound') {
        throw new NotFound('ID не найден');
      }
    })
    .catch(next);
};

module.exports.deleteLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).orFail(() => {
    throw new NotFound('ID не найден');
  })
    .then((card) => res.status(CODE_OK).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequest('Данные переданы неверно');
      }
      if (err.message === 'NotFound') {
        throw new NotFound('ID не найден');
      }
    })
    .catch(next);
};
