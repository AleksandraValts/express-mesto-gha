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
router.patch('/me', changeUserInfo, validationUpdateUser);
router.get('/:userId', getUserId, validationUserId);
router.patch('/me/avatar', changeAvatar, validationUpdateAvatar);
module.exports = router;
