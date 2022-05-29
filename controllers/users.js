const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { ServerError } = require('../Errors/ServerError');
const { NotFoundErr } = require('../Errors/NotFoundErr');
const { BadReqestError } = require('../Errors/BadReqestError');
const { AuthError } = require('../Errors/AuthError');
const { ConflictingError } = require('../Errors/ConflictingError');

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
  const {
    about,
    name,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      res.status(201).send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const fields = Object.keys(err.errors).join(' and ');
        next(new BadReqestError(`Field(s) ${fields} are not correct`));
      } if (err.code === 11000) {
        return next(new ConflictingError('Этот email уже занят'));
      }
      return next(err);
    });
};

const getUserById = (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      if (!user) {
        return next(new NotFoundErr('User not found!!'));
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return next(new BadReqestError('Id is not correct'));
      }
      return next(new ServerError());
    });
};

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        next(new NotFoundErr());
      }
      res.status(200).send({ user });
    })
    .catch((err) => {
      if (err.message === 'NotFound') {
        next(new NotFoundErr());
      }
      next(new ServerError());
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'testKey', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(() => {
      next(new AuthError('Неправильные почта или пароль'));
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
        return next(new NotFoundErr('User not found'));
      }
      return res.status(200).send(userInfo);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const fields = Object.keys(err.errors).join(' and ');
        return next(new BadReqestError(`Field(s) ${fields} are not correct`));
      }
      return next(new ServerError());
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
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const fields = Object.keys(err.errors).join(' and ');
        return next(new BadReqestError(`Field(s) ${fields} are not correct`));
      }
      return next(new ServerError());
    });
};

module.exports = {
  getUserById,
  getUser,
  getUsers,
  createUser,
  login,
  updateUserProf,
  updateUserAvatar,
};
