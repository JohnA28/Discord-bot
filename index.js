//Suck my balls, Mr. Garrison.
const Discord = require('discord.js')
const bot     = new Discord.Client({ws: {intents: Discord.Intents.ALL}});
const fs      = require("fs")
require("dotenv").config()
bot.commands  = new Discord.Collection();

bot.on('ready', () => {
    console.log('Bot online')


    //reads command directory
    fs.readdir('./commands', (err, files) => {
    //checks filereader for error
        if(err) return console.log(console.err);
        //splits commands so it will just read command instead of command.js
        let jsfile = files.filter(f => f.split(".").pop() == 'js')

        if(jsfile.length == 0) {return console.log("No commands could be found")}

        jsfile.forEach(f => {
            let props = require(`./commands/${f}`);
            bot.commands.set(props.help.name, props)
        })
    })
})


bot.on('message', (message) => {
    if(message.author.bot) return;
    if(message.channel.type !== 'text') return;
// prefix to use bot
    let prefix = '*';
// seperates messaages by spaces
    let MessageArray = message.content.split(' ');
    let cmd          = MessageArray[0].slice(prefix.length)
    let args         = MessageArray.slice(1)

    if(!message.content.startsWith(prefix)) return;

    let commandfile = bot.commands.get(cmd);
    if(commandfile)   {commandfile.run(bot,message,args)}


})


bot.login(process.env.DISCORD_TOKEN)
