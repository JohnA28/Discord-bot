const {SlashCommandBuilder} = require('discord.js');
const gameSchema = require('../Schemas/game');
const userSchema = require('../Schemas/user')

module.exports = {
  data: new SlashCommandBuilder()
  .setName('add-game')
  .setDescription('Add a game you completed')

  .addStringOption(option => 
    option.setName('game-name')
    .setDescription('Name of the game completed')
    .setRequired(true))

  .addStringOption(option => 
    option.setName('points-worth')
    .setDescription('How many points is this game worth?')
    .setRequired(true))

  .addStringOption(option => 
      option.setName('platform')
      .setDescription('How did you play this game?')
      .setRequired(true)),

  async execute (interaction) {
    const { options } = interaction;

    //saving inputs
    const gameName = options.getString('game-name');
    const gamePoints = options.getString('points-worth');
    const gamePlatform = options.getString('platform');

    //retreiving id of message sender
    let userId = await userSchema.findOne({discord_id: interaction.user.username});

    
    if (!userId) {
      let newUser = new userSchema({
        discord_id: interaction.user.username
      })
      await newUser.save();
    }



    await gameSchema.create ({
      name: gameName,
      points: gamePoints,
      platform: gamePlatform,
      player: userId || interaction.user.username
    });

    await interaction.reply('Data saved, Good work!');

  }
}