const {SlashCommandBuilder} = require('discord.js');
const gameSchema = require('../Schemas/game');
const userSchema = require('../Schemas/user');
const user = require('../Schemas/user');

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
    const userId = await userSchema.findOne({discord_id: interaction.user.username});

    
    //will save user's info if not found in database
    if (!userId) {
      const newUser = new userSchema({
        discord_id: interaction.user.username
      })
      await newUser.save();
    }


    //creates new game object
    const newGame = await gameSchema.create ({
      name: gameName,
      points: gamePoints,
      platform: gamePlatform,
      player: userId
    });


    //adds the inserted game to the user's completedGames array
    userId.completedGames.push(newGame);
    userId.save()



    await interaction.reply('Data saved, Good work!');

  }
}