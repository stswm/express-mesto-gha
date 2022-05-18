const express = require('express');
const mongoose = require('mongoose');
const { userRouter } = require('./routes/users');
const { cardRouter } = require('./routes/cards');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '628501fb87c5907584461035',
  };
  next();
});
app.use('/users', userRouter);
app.use('/cards', cardRouter);
const errorHeandler = (err, req, res, next) => {
  console.log(`Error code ${err.code}: ${err.message}`);
  res.status(err.code).send(err.message);
  next();
};
app.use(errorHeandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
