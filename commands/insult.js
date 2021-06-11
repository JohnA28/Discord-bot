exports.run = async (bot,message,args) => {

   let pick = Math.floor(Math.random() * 6);

   switch (pick) {
    case 0:
      day = "If your brain was dynamite, there wouldn’t be enough to blow your hat off.";
      break;
    case 1:
      day = "Light travels faster than sound, which is why you seemed bright until you spoke.";
      break;
    case 2:
       day = "I’m not insulting you; I’m describing you";
      break;
    case 3:
      day = "OH MY GOD! IT SPEAKS!";
      break;
    case 4:
      day = "You are like a cloud. When you disappear, it’s a beautiful day";
      break;
    case 5:
      day = "You bring everyone so much joy… when you leave the room";
      break;
    case 6:
      day = "The last time I saw something like you… I flushed";
  }

  message.channel.send(day)
}

exports.help = {
    name: "insult"
}