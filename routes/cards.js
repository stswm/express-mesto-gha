const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  addLikeCard,
  deleteLikeCard,
} = require('../controllers/cards');
const {
  validateCardId,
  validateCreateCard,
} = require('../middlewares/validator');

router.get('/', getCards);
router.post('/', validateCreateCard, createCard);
router.delete('/:cardId', validateCardId, deleteCard);
router.put('/:cardId/likes', validateCardId, addLikeCard);
router.delete('/:cardId/likes', validateCardId, deleteLikeCard);

module.exports.cardRouter = router;
