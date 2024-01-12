//this command is working fine for now but I need to find a way to list the games with their point value next to them

const {SlashCommandBuilder} = require('discord.js');
const gameSchema = require('../Schemas/game');
const userSchema = require('../Schemas/user')

module.exports = {
  data: new SlashCommandBuilder()
  .setName('list-games')
  .setDescription('List your completed games'),

  async execute (interaction) {
  

    let userId = await userSchema.findOne({discord_id: interaction.user.username});
    const completedGames = userId.completedGames //accesses array of games for specific user
    const gameNames = [];
    let totalPoints = 0;
    //const gamePlatforms = [];


    //console.log(userId)
    //console.log(gameObject)
    

    //loops thru completed games array for specific user
    for (gamesIndex = 0; gamesIndex < completedGames.length ; gamesIndex++) {
      let gameObject = await gameSchema.findOne({_id: completedGames[gamesIndex]}) //specific game element in the array
      gameNames.push(gameObject.name);
      //gamePoints.push(gameObject.points);
      totalPoints += gameObject.points
      //gamePlatforms.push(gameObject.platform);
    }

    //console.log(gameNames)
    //console.log(totalPoints);

    await interaction.reply({content: `${gameNames.join('\n')} \n which are worth a total of: ${totalPoints} points!`});
  }
}