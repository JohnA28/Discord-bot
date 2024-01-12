const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');



module.exports = {
  data: new SlashCommandBuilder()
    .setName('poll')
    .setDescription('Create a poll')

    //these will be the 2 choices in the poll
    .addStringOption(option => 
      option.setName('firstchoice')
      .setDescription('First choice for the poll')
      .setRequired(true))

      
    .addStringOption(option =>
      option.setName('secondchoice')
      .setDescription('Second choice for the poll')
      .setRequired(true)),


  async execute(interaction) {
    //retrieves input value 
    const option1 = interaction.options.getString('firstchoice')
    const option2 = interaction.options.getString('secondchoice')

    const choice1 = new ButtonBuilder()
        .setCustomId('choice')
        .setLabel('Option 1')
        .setStyle(ButtonStyle.Primary);
    
    
    const choice2 = new ButtonBuilder()
        .setCustomId('otherchoice')
        .setLabel('Option 2')
        .setStyle(ButtonStyle.Danger);
        

    const responseRow = new ActionRowBuilder()
      .addComponents(choice1,choice2)

    await interaction.reply({
      content: option1 + ' or ' + option2,
      components: [responseRow]
    })




  }
}