const fetch   = require("node-fetch")
const Discord = require('discord.js')

const link    = 'https://www.reddit.com/r/ValorantMemes/.json?sort=top/?t=day'

exports.run = async (bot,message,args) => {
    let fetchvMeme  = await fetch(link).then(m => m.json())
    const getvMeme  = fetchvMeme.data.children;
    let randomvMeme = getvMeme[Math.floor(Math.random() * getvMeme.length)]
    let vmemeEmbed  = new Discord.MessageEmbed()
    .setTitle(randomvMeme.data.title)
    .setImage(randomvMeme.data.url)
    .setColor("#cc00cc")


    message.channel.send(vmemeEmbed)
}



exports.help = {
    name: "valorantmeme"
}