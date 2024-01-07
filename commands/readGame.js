const {SlashCommandBuilder} = require('discord.js');
const gameSchema = require('../Schemas/game');

module.exports = {
  data: new SlashCommandBuilder()
  .setName('list-games')
  .setDescription('List your completed games'),

  async execute (interaction) {
    const data = await gameSchema.find();
    var values = [];

    await data.forEach(async d => {
      values.push(d.name);
    });

    await interaction.reply({content: `${values.join('\n')}`});
  }
}