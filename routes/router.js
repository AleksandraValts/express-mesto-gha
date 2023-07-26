const router = require('express').Router();
const express = require('express');
const NotFound = require('../errors/NotFound (404)');
const auth = require('../middlewares/auth');

const usersRouter = require('./users');
const cardsRouter = require('./cards');

router.use('/users', auth, usersRouter);
router.use('/cards', cardsRouter);
router.use((req, res, next) => {
  next(new NotFound('Страница не найдена!'));
});

router.use(express.json());
module.exports = router;
