const router = require('express').Router();

const {
  getUser, getUserId, changeUserInfo, changeAvatar, getLogUser,
} = require('../controllers/users');

const {
  validationChangeAvatar, validationUserId, validationChangeUserInfo,
} = require('../middlewares/validate');

router.get('/', getUser);
router.get('/me', getLogUser);
router.patch('/me', validationChangeUserInfo, changeUserInfo);
router.get('/:userId', validationUserId, getUserId);
router.patch('/me/avatar', validationChangeAvatar, changeAvatar);
module.exports = router;
