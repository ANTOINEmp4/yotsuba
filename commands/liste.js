const fs = require('fs');
const Discord = require('discord.js')
let fichier = JSON.parse(fs.readFileSync("./liste.json", "utf8"));


module.exports.run = async (bot, message, args) => {
  message.delete()
    const help = new Discord.RichEmbed()
             .setTitle("Liste des animé")
             .setColor('GREEN')
             .setThumbnail(bot.user.avatarURL)
    for (var infokey in fichier.Animés) {
        var info = fichier.Animés[infokey];
      if(!info) return
        help.addField('-', info);
    }
    message.author.send({ embed : help }).then(msg => {
            msg.delete(8000)
          });
}