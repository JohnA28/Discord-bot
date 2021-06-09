const fetch   = require("node-fetch")
const Discord = require('discord.js')
    
const link    = 'https://www.reddit.com/r/cat.json?sort=/top/'



exports.run = async (bot,message,args) => {
    let fetchCat  = await fetch(link).then(m => m.json())
    const getCat  = fetchCat.data.children;
    let randomCat = getCat[Math.floor(Math.random() * getCat.length)]
    let catEmbed  = new Discord.MessageEmbed()
    .setTitle(randomCat.data.title)
    .setImage(randomCat.data.url)
    .setColor("#cc00cc")


    message.channel.send(catEmbed)
}



exports.help = {
    name: "cat"
}