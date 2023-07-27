const BadRequest = (res) => {
  res
    .status(400)
    .send({ message: 'Данные переданы неверно' });
};

module.exports = BadRequest;
