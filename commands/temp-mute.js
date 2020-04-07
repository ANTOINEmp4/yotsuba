const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

  //!tempmute @user 1s/m/h/d

  let reason = args.slice(2).join(" ");
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("Ce membre n'est pas sur ce serveur.");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Je ne peut pas le mute!");
  let muterole = message.guild.roles.find(`name`, "muted");
  //start of create role
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "muted",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end of create role
  let mutetime = args[1];
  if(!mutetime) return message.reply("Tu n'as pas spécifié de temps!");

  await(tomute.addRole(muterole.id));
  let embed = new Discord.RichEmbed()
  .setColor('#FF0000')
  .setAuthor('Tu a été mute !', tomute.avatarURL)
  .setThumbnail('https://i.imgur.com/8dtPmtV.gif')
  .addField('Serveur :', message.guild.name, true)
  .addField("Moderateur :", message.author.username, true)
  .addField('Raison :', reason, true)
  .addField('Temps :', mutetime)
  .setTimestamp()
  .setFooter('Create by ANTOINEmp4');
    tomute.user.send(embed)
    let embed2 = new Discord.RichEmbed()
    .setColor('#FF0000')
    .setAuthor('Mute log', message.author.avatarURL)
    .setThumbnail('https://i.imgur.com/8dtPmtV.gif')
    .addField('Membre :', tomute, true)
    .addField("Moderateur :", message.author.username, true)
    .addField('Raison :', reason, true)
    .addField('Temps :', mutetime)
    .setTimestamp()
    .setFooter('Create by ANTOINEmp4');
    message.guild.channels.find("name", "「📃」logs").send(embed2)
    let embed3 = new Discord.RichEmbed()
    .setColor('#FF0000')
    .setAuthor('Mute log', message.author.avatarURL)
    .setThumbnail('https://i.imgur.com/8dtPmtV.gif')
    .addField('Membre :', tomute, true)
    .addField('Raison :', reason, true)
    .addField('Temps :', mutetime)
    .setTimestamp()
    .setFooter('Create by ANTOINEmp4');
    message.author.send(embed3)

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    let embed2 = new Discord.RichEmbed()
    .setColor('GREEN')
    .setAuthor('UnMute log', 'https://i.imgur.com/8dtPmtV.gif')
    .setThumbnail('https://i.imgur.com/8dtPmtV.gif')
    .addField('Membre :', `${tomute} a été unmute!`)
    .setTimestamp()
    .setFooter('Create by ANTOINEmp4');
    message.guild.channels.find("name", "「📃」logs").send(embed2)
  }, ms(mutetime));


//end of module
}