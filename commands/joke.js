/*
this command is used to send jokes, currently it can only send single joketype but eventually
will edit to be able to send setup, punchline, category amongst other features.

*/


const fetch   = require("node-fetch")
const link = 'https://v2.jokeapi.dev/joke/Any?type=single'


exports.run = async (bot,message,args) => {
 const response  = await fetch(link).then(m => m.json()) //takes joke data from site converts to json
 console.log(response);

 message.channel.send(response.joke) // sends joke
}




exports.help = {
    name: "joke"
}