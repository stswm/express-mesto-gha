const Card = require('../models/card');
const { ServerError } = require('../Errors/ServerError');
const { NotFoundErr } = require('../Errors/NotFoundErr');
const { BadReqestError } = require('../Errors/BadReqestError');
const { ForbiddenError } = require('../Errors/ForbiddenError');

const getCards = (_, res, next) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch(() => {
      next(new ServerError());
    });
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const fields = Object.keys(err.errors).join(' and ');
        return next(new BadReqestError(`Field(s) ${fields} are not correct`));
      }
      return next(new ServerError());
    });
};

const deleteCard = (req, res, next) => {
  const id = req.params.cardId;

  Card.findById(id)
    .then((card) => {
      if (!card) {
        return next(new NotFoundErr('Card not found'));
      }
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError();
      }
      return card.remove().then(() => res.status(200).send(card));
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return next(new BadReqestError('Card Id is not correct'));
      }
      return next(err);
    });
};

const addLikeCard = (req, res, next) => {
  const id = req.params.cardId;
  Card.findByIdAndUpdate(
    id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return next(new NotFoundErr('Card not found'));
      }
      return res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new BadReqestError('Card Id is not correct'));
      }
      next(new ServerError());
    });
};

const deleteLikeCard = (req, res, next) => {
  const id = req.params.cardId;
  Card.findByIdAndUpdate(
    id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return next(new NotFoundErr('Card not found'));
      }
      return res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return next(new BadReqestError('Card Id is not correct'));
      }
      return next(new ServerError());
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLikeCard,
  deleteLikeCard,
};
