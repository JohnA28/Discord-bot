exports.run = async (bot,message,args) => {

   let insults = [
     "If your brain was dynamite, there wouldn’t be enough to blow your hat off.",
     "Light travels faster than sound, which is why you seemed bright until you spoke.",
     "I’m not insulting you; I’m describing you",
     "OH MY GOD! IT SPEAKS!",
     "You are like a cloud. When you disappear, it’s a beautiful day",
     "You bring everyone so much joy… when you leave the room",
     "The last time I saw something like you… I flushed"
   ]

   let pick = Math.floor(Math.random() * insults.length);

  message.channel.send(insults[pick])
}

exports.help = {
    name: "insult"
}
