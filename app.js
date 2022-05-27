const express = require('express');
const mongoose = require('mongoose');
const { userRouter } = require('./routes/users');
const { cardRouter } = require('./routes/cards');
const { mainRouter } = require('./routes/main');
const { errorHeandler } = require('./controllers/main');
const {
  login,
  createUser,
} = require('./controllers/users');
const auth = require('./middlewares/auth');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);
app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use('*', mainRouter);

app.use(errorHeandler);
app.use((err, req, res, _next) => {
  if (err.statusCode) {
    return res.status(err.statusCode).send({ message: err.message || 'Что-то не так' });
  }

  res.status(500).send({ message: 'Что-то сломалось' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
