const {Schema, model} = require('mongoose');

const game = new Schema({
  name: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    required: true
  },
  platform: {
    type: String,
    required: true
  },

})

module.exports = model('game', game);