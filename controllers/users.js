/* eslint-disable max-len */
/* eslint-disable eqeqeq */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
const User = require('../models/user');
const {
  ServerError,
  BadReqestError,
  NotFoundErr,
} = require('./Errors');

const getUsers = (_, res, next) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(() => {
      next(new ServerError());
    });
};

const createUser = (req, res, next) => {
  const { about, name, avatar } = req.body;
  // if (!about || !name || !avatar) {
  //   next(new BadReqestError('Valid err'));
  // }

  User.create({ name, about, avatar })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const fields = Object.keys(err.errors).join(' and ');
        // return res.status(400).send({ message: err });
        next(new BadReqestError(`Field(s) ${fields} are not correct`));
      }
      next(new ServerError());
    });
};

const getUser = (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      if (!user) {
        next(new NotFoundErr('User not found!!'));
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.kind == 'ObjectId') {
        // return res.status(400).send({ message: 'id is not correct' });
        next(new BadReqestError('Id is not correct'));
      }

      if (err.code == 11000) {
        next(BadReqestError('Such user is already in database'));
      }
      // next(new ServerError());
    });
};

const updateUserProf = (req, res, next) => {
  const { name, about } = req.body;
  const id = req.user._id;
  User.findByIdAndUpdate(
    id,
    {
      name,
      about,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((userInfo) => {
      if (!userInfo) {
        next(new NotFoundErr('User not found'));
      }
      res.status(200).send(userInfo);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const fields = Object.keys(err.errors).join(' and ');
        next(new BadReqestError(`Field(s) ${fields} are not correct`));
      }
      next(new ServerError());
    });
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const id = req.user._id;
  User.findByIdAndUpdate(
    id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        return next(new NotFoundErr('User not found'));
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const fields = Object.keys(err.errors).join(' and ');
        next(new BadReqestError(`Field(s) ${fields} are not correct`));
      }
      next(new ServerError());
    });
};

module.exports = {
  getUser,
  getUsers,
  createUser,
  updateUserProf,
  updateUserAvatar,
};
