const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUserById,
  getUsers,
  updateUser,
  updateUserAvatar,
  userProfile,
} = require('../controllers/users');
const { regularValidetUrl } = require('../utils/constants');

router.get('/users', getUsers);
router.get('/user/me', userProfile);
router.get(
  '/user/:id',
  celebrate({
    params: Joi.object()
      .keys({
        id: Joi.string().required().hex().length(24),
      })
      .unknown(true),
  }),
  getUserById,
);

router.patch(
  '/user/me',
  celebrate({
    body: Joi.object()
      .keys({
        name: Joi.string().required().min(2).max(30),
        about: Joi.string().required().min(2).max(30),
      })
      .unknown(true),
  }),
  updateUser,
);

router.patch(
  '/user/me/avatar',
  celebrate({
    body: Joi.object()
      .keys({
        avatar: Joi.string().required().pattern(regularValidetUrl),
      })
      .unknown(true),
  }),
  updateUserAvatar,
);

module.exports = router;
