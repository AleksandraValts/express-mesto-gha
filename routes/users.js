const express = require('express');
const router = require('express').Router();

const {
  getUser,
  createUser,
  getUserId,
  changeUserInfo,
  changeAvatar,
} = require('../controllers/users');

router.get('/', getUser);
router.get('/:userId', getUserId);
router.post('/', express.json(), createUser);
router.patch('/me', express.json(), changeUserInfo);
router.patch('/me/avatar', express.json(), changeAvatar);
module.exports = router;
