const Discord = require("discord.js");
exports.run = async (client, message, args, tools) => {
  
    async function purge(){
  
              if(!message.member.hasPermission('KICK_MEMBERS')){
                  message.reply(`Tu n'as pas la permission d'executer cette commande !`)  .then(msg => {
                    msg.delete(8000)
                  })
                  return;
              }
  
              if (isNaN(args[0])){
                  message.reply(`Il faut mettre un nombre !`)  .then(msg => {
                    msg.delete(8000)
                  })
                  return;
              }

              if (args[0] > 100){
                message.reply(`Tu ne peut pas supprimer plus de 100 message à la fois !`)  .then(msg => {
                  msg.delete(8000)
                })
                return;
            }
            message.channel.bulkDelete(args[0])
            .then (messages => message.channel.send(`\`${messages.size}/${args[0]}\` **messages supprimés avec succès !**`).then(msg => {
              msg.delete(8000)
            }));

            var channel = message.guild.channels.find("name", "「📃」logs");
            let pEmbed = new Discord.RichEmbed()
                .setTitle('Purge log')
                .setThumbnail('https://i.imgur.com/8dtPmtV.gif')
                .addField('Infos :', message.author + ' viens de supprimer ' + args[0] + ' messages')
                .addField('Salon :', message.channel)
                .setFooter("Merci de garder les salons propres :)")
                .setTimestamp()
                .setColor(0x228B22)
            channel.send({
                embed: pEmbed
            })
  
          }
  
          purge();
    
  }