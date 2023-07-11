const router = require('express').Router();
const express = require('express');

const usersRouter = require('./users');
const cardsRouter = require('./cards');

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use('*', (req, res) => {
  res.status(404).send({ message: 'Not Found' });
});

router.use(express.json());
module.exports = router;
