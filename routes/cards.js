const router = require('express').Router();

const {
  getCard, createCard, deleteCard, putLike, deleteLike,
} = require('../controllers/cards');

const {
  validationCreateCard, validationCardId,
} = require('../middlewares/validate');

router.get('/', getCard);
router.post('/', validationCreateCard, createCard);
router.delete('/:cardId', validationCardId, deleteCard);
router.put('/:cardId/likes', validationCardId, putLike);
router.delete('/:cardId/likes', validationCardId, deleteLike);
module.exports = router;
