const Discord = require('discord.js');

exports.run = (client, message, args, ops) => {

  if (message.member.hasPermission("BAN_MEMBERS")) {
      if (!message.mentions.users.size) {
        return message.author.send('Tu dois spécifié un membre.').then(msg => {
          msg.delete(8000)
        });
      } 
      
      else {
      // !kick <membre> [raison]
        let member = message.mentions.members.first();
        let reason = args.slice(1).join(" ");
                
      if (!args[1]) {
          return message.author.se,d(`Il faut mettre une raison !`)  .then(msg => {
            msg.delete(8000)
          })
      }else{

        if (member.kickable == false) {
          return;
        } else {
          let embed = new Discord.RichEmbed()
          .setColor('#FF0000')
          .setAuthor('Tu a été ban !', member.avatarURL)
          .setThumbnail('https://i.imgur.com/8dtPmtV.gif')
          .addField('Serveur :', message.guild.name, true)
          .addField("Moderateur :", message.author.username, true)
          .addField('Raison :', reason)
          .setTimestamp()
          .setFooter('Create by ANTOINEmp4');
         member.user.send(embed)
         let embed2 = new Discord.RichEmbed()
         .setColor('#FF0000')
         .setAuthor('Ban log', message.author.avatarURL)
         .setThumbnail('https://i.imgur.com/8dtPmtV.gif')
         .addField('Membre :', member, true)
         .addField("Moderateur :", message.author.username, true)
         .addField('Raison :', reason)
         .setTimestamp()
         .setFooter('Create by ANTOINEmp4');
         message.guild.channels.find("name", "「📃」logs").send(embed2)
         let embed3 = new Discord.RichEmbed()
         .setColor('#FF0000')
         .setAuthor('Ban log', message.author.avatarURL)
         .setThumbnail('https://i.imgur.com/8dtPmtV.gif')
         .addField('Membre :', member, true)
         .addField('Raison :', reason, true)
         .setTimestamp()
         .setFooter('Create by ANTOINEmp4');
         message.author.send(embed3)
          var c = 40;

  setInterval(function () {
  c = c - 1;

  if (c == 0) {
  console.log("Ban")
  member.ban(reason);

  console.log(`${message.author.tag} a ban ${member.user.tag} de '${message.guild.name}'.`);
  return;
  }
  }, 10)
        }
      }
  }
    } else {
      message.reply(`Tu n'as pas la permission d'executer cette commande !`)  .then(msg => {
        msg.delete(8000)
      })
      return;
    }

}