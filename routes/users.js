const router = require('express').Router();

const {
  getUser,
  getUserId,
  changeUserInfo,
  changeAvatar,
  getLogUser,
} = require('../controllers/users');

const {
  validationUpdateUser,
  validationUpdateAvatar,
  validationUserId,
} = require('../middlewares/validate');

router.get('/', getUser);
router.get('/me', getLogUser);
router.patch('/me', validationUpdateUser, changeUserInfo);
router.get('/:userId', validationUserId, getUserId);
router.patch('/me/avatar', validationUpdateAvatar, changeAvatar);
module.exports = router;
