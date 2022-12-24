// Require the necessary classes
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

//collection helps store and retrieve commands 
client.commands = new Collection();


// file path for commands directory
const commandsPath = path.join(__dirname, 'commands'); 

// returns an array of all command filenames that end with .js
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js')); 


/*
With the correct files identified, 
the last step is to loop over the array and dynamically set each command into the client.commands Collection. 
For each file being loaded, check that it has at least the data and execute properties. 
This helps to prevent errors resulting from loading empty, unfinished or otherwise incorrect command files
*/
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

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
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});




client.once(Events.ClientReady, c => {
	console.log(`Bot is online!`);
});

// login for the bot using token
client.login(process.env.TOKEN); 