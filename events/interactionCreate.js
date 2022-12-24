const { Events } = require('discord.js');

/*
Every slash command is an interaction, 
so to respond to a command, we need to create a listener for the Client#event:interactionCreate event 
that will execute code when our bot receives an interaction.

Not every interaction is a slash command (e.g. MessageComponent interactions). 
To make sure we only handle slash commands we check with the ischatinputcommand() to make sure
the messgae is a command and exit the handler if another type is encountered.

afterwards we return an error to the console if the inputted command doesn't exist
otherwise the command tries to execute and if an error is encountered the error is 
logged in the console and a message stating there was an error is sent by the bot
*/

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(`Error executing ${interaction.commandName}`);
			console.error(error);
		}
	},
};