const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const router = require('./routes/router');

const { PORT = 3000 } = process.env;
const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use((req, res, next) => {
  req.user = {
    _id: '64aad99f88d7dd72ff8d4380',
  };
  next();
});

app.use(router);

app.listen(PORT, () => {
  console.log('Ссылка на сервер');
});
