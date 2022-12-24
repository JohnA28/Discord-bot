require('dotenv').config();
const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
client.events = new Collection();

/*
idk what this does but it's required  
*/
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ], 
    partials: [
        Partials.User,
        Partials.Channel,
        Partials.Message,
        Partials.GuildMember,
        Partials.GuildMessages,
    ] 
});

client.on('ready', () => {
    console.log('Bot online');
});

client.login(process.env.BOT_TOKEN); //connects the bot using token