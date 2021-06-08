exports.run = async (bot,message,args) => {
        //takes first person mentioned in message
        let member = message.mentions.members.first();
        if(!member){
            message.channel.send('hello');} 
            else{
            message.channel.send(`hello ${member.user.tag}`)
        }
}


exports.help = {
    name: "hello"
}