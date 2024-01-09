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
  player: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
})

module.exports = model('game', game);