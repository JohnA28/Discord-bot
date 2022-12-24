const { SlashCommandBuilder } = require('discord.js');

/*
Use this as a small template for the bare minimum you'd need to export a command

At a minimum, the definition of a slash command must have a name and a description. 
Slash command names must be between 1-32 characters and contain no capital letters, spaces, 
or symbols other than - and _


A slash command also requires a function to run when the command is used, to respond to the interaction. 
Using an interaction response method confirms to Discord that your bot successfully received the interaction, 
and has responded to the user. Discord enforces this to ensure that all slash commands provide a good user experience

The data property, which will provide the command definition shown above for registering to Discord.
The execute method, which will contain the functionality to run from our event handler when the command is used.


These are placed inside module.exports so they can be read by the commandloader and command development script
*/

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};