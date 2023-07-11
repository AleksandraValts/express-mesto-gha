const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    default: 'https://sun9-4.userapi.com/impf/PP_jfmtC4F8JMYPg3f5W2-alQ2XJeN9D_EPFiQ/0AkaiVUUAVE.jpg?size=1080x1080&quality=96&sign=eeb5722d74dbef9d0df7c0157139de38&type=album',
  },
});

module.exports = mongoose.model('user', userSchema);
