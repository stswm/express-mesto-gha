const router = require('express').Router();
const {
  getUserById,
  getUser,
  getUsers,
  updateUserProf,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/:id', getUserById);
router.get('/', getUsers);
router.get('/me', getUser);
router.patch('/me', updateUserProf);
router.patch('/me/avatar', updateUserAvatar);

module.exports.userRouter = router;
