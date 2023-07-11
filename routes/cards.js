const express = require('express');
const router = require('express').Router();

const {
  getCard,
  createCard,
  deleteCard,
  putLike,
  deleteLike,
} = require('../controllers/cards');

router.get('/', getCard);
router.post('/', express.json(), createCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', putLike);
router.delete('/:cardId/likes', deleteLike);
module.exports = router;
