/* eslint-disable max-len */
/* eslint-disable eqeqeq */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
const Card = require('../models/card');
const {
  ServerError,
  NotFoundErr,
} = require('./Errors');

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
  if (!name || !link) {
    next(new ServerError());
  }
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const fields = Object.keys(err.errors).join(' and ');
        next(new ServerError(`Field(s) ${fields} are not correct`));
      }
      next(new ServerError());
    });
};

const deleteCard = (req, res, next) => {
  const id = req.params.cardId;
  Card.findByIdAndDelete(id)
    .then((card) => {
      if (!card) {
        next(new NotFoundErr('Card not found'));
      }
      res.status(200).send(`${card} Card delete successful`);
    })
    .catch((err) => {
      if (err.kind == 'ObjectId') {
        next(new ServerError('Card Id is not correct'));
      }
      // next(new ServerError());
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
        next(new NotFoundErr('Card not found'));
      }
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.kind == 'ObjectId') {
        next(new ServerError('Card Id is not correct'));
      }
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
        next(new NotFoundErr('Card not found'));
      }
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.kind == 'ObjectId') {
        next(new ServerError('Card Id is not correct'));
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLikeCard,
  deleteLikeCard,
};
