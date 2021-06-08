const JokeAPI = require('sv443-joke-api');
const link = 'https://v2.jokeapi.dev/joke/Any'


exports.run = async (bot,message,args) => {
    JokeAPI.getJokes(link)
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
    })

    message.channel.send(data)
}


exports.help = {
    name: "joke"
}