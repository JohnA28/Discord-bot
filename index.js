// Require the necessary classes
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

// Create a new client instance
const client = new Client({ 
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent
	] 
});

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


//same idea as above but for events
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// login for the bot using token
client.login(process.env.TOKEN); 