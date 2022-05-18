const router = require('express').Router();
const {
  getUser,
  getUsers,
  createUser,
  updateUserProf,
  updateUserAvatar,
} = require('../controllers/users');

router.post('/', createUser);
router.get('/:id', getUser);
router.get('/', getUsers);
router.patch('/me', updateUserProf);
router.patch('/me/avatar', updateUserAvatar);

module.exports.userRouter = router;
