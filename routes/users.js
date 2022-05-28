const router = require('express').Router();
const {
  getUserById,
  getUser,
  getUsers,
  updateUserProf,
  updateUserAvatar,
} = require('../controllers/users');
const {
  validateUpdateUserProf,
  validateUpdateUserAvatar,
  validateUserId,
} = require('../middlewares/validator');

router.get('/', getUsers);
router.get('/me', getUser);
router.get('/:id', validateUserId, getUserById);
router.patch('/me', validateUpdateUserProf, updateUserProf);
router.patch('/me/avatar', validateUpdateUserAvatar, updateUserAvatar);

module.exports.userRouter = router;
