const router = require('express').Router();

const {
  getCard, createCard, deleteCard, putLike, deleteLike,
} = require('../controllers/cards');

const {
  validationCreateCard, validationCardById,
} = require('../middlewares/validate');

router.get('/', getCard);
router.post('/', validationCreateCard, createCard);
router.delete('/:cardId', validationCardById, deleteCard);
router.put('/:cardId/likes', validationCardById, putLike);
router.delete('/:cardId/likes', validationCardById, deleteLike);
module.exports = router;
