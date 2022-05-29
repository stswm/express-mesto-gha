const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { userRouter } = require('./routes/users');
const { cardRouter } = require('./routes/cards');
const { mainRouter } = require('./routes/main');
const { errorHeandler } = require('./controllers/main');
const {
  login,
  createUser,
} = require('./controllers/users');
const {
  validateNewUser,
  validateLogin,
} = require('./middlewares/validator');
const auth = require('./middlewares/auth');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());

app.post('/signup', validateNewUser, createUser);
app.post('/signin', validateLogin, login);

app.use(auth);
app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use('*', mainRouter);

app.use(errors());
app.use(errorHeandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
