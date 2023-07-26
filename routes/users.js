const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUser,
  getUserId,
  changeUserInfo,
  changeAvatar,
  getLogUser,
} = require('../controllers/users');

const { validationUpdateAvatar } = require('../middlewares/validate');

router.get('/', getUser);
router.get('/me', getLogUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), changeUserInfo);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required(),
  }),
}), getUserId);

router.patch('/me/avatar', validationUpdateAvatar, changeAvatar);
module.exports = router;
