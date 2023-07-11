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
router.post('/', createUser);
router.patch('/me', changeUserInfo);
router.patch('/me/avatar', changeAvatar);
module.exports = router;
