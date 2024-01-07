const {Schema, model} = require('mongoose');

const user = new Schema({
  discord_id: {
    type: String,
    unique: true,
    required: true
  },
  completedGames: [{
    type: Schema.Types.ObjectId,
    ref: 'game'
  }]
})


module.exports = model('user', user);