const {SlashCommandBuilder} = require('discord.js');
const gameSchema = require('../Schemas/game');

module.exports = {
  data: new SlashCommandBuilder()
  .setName('delete-game')
  .setDescription('delete a game'),

  async execute (interaction) {
    const data = await testSchema.find();

    await data.forEach(async d => {
      await gameSchema.deleteOne({name: d.name})
    });

    await interaction.reply({content:`I deleted the values`});
  }
}