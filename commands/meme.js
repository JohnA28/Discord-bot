const fetch   = require("node-fetch")
const Discord = require('discord.js')

const link    = 'https://www.reddit.com/r/memes/.json?sort=top/?t=day'

exports.run = async (bot,message,args) => {
    let fetchMeme  = await fetch(link).then(m => m.json())
    const getMeme  = fetchMeme.data.children;
    let randomMeme = getMeme[Math.floor(Math.random() * getMeme.length)]
    let memeEmbed  = new Discord.MessageEmbed()
    .setTitle(randomMeme.data.title)
    .setImage(randomMeme.data.url)
    .setColor("#cc00cc")


    message.channel.send(memeEmbed)
}



exports.help = {
    name: "meme"
}