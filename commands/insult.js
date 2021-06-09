exports.run = async (bot,message,args) => {

   let pick = Math.floor(Math.random() * 6);

   switch (pick) {
    case 0:
      day = "Sunday";
      break;
    case 1:
      day = "Monday";
      break;
    case 2:
       day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday";
      break;
    case 5:
      day = "Friday";
      break;
    case 6:
      day = "Saturday";
  }

  message.channel.send(day)
}

exports.help = {
    name: "LiberalPropaganda"
}