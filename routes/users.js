const router = require('express').Router();

const {
  getUser, getUserId, changeUserInfo, changeAvatar, getLogUser,
} = require('../controllers/users');

const {
  validationChangeAvatar, validationUserId, validationChangeUser,
} = require('../middlewares/validate');

router.get('/', getUser);
router.get('/me', getLogUser);

router.patch('/me', validationChangeUser, changeUserInfo);

router.get('/:userId', validationUserId, getUserId);
router.patch('/me/avatar', validationChangeAvatar, changeAvatar);
module.exports = router;
