const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const router = require('./routes/router');
const auth = require('./middlewares/auth');
const { createUser, login } = require('./controllers/users');
const { validationCreateUser, validationLogin } = require('./middlewares/validate');
const error = require('./middlewares/error');
const NotFound = require('./errors/NotFound (404)');

const { PORT = 3000 } = process.env;

const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/signin', validationLogin, login);
app.post('/signup', validationCreateUser, createUser);
app.use(auth);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(router);
app.use((req, res, next) => next(new NotFound('Страницы не существует')));
app.use(errors());
app.use(error);

app.listen(PORT, () => {
  console.log('Ссылка на сервер');
});
