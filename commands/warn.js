const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

exports.run = (client, message, args, ops) => {

  //!warn @daeshan <reason>
  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Tu n'as pas la perm");
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!wUser) return message.reply("Ce membre n'est pas valide");
  if(wUser.hasPermission("MANAGE_MESSAGES")) return message.reply("Je ne peut pas warn ce membre");
  let reason = args.join(" ").slice(22);

  if(!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };

  warns[wUser.id].warns++;

  fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
    if (err) console.log(err)
  });

  let warnEmbed = new Discord.RichEmbed()
  .setColor('#FF0000')
  .setAuthor('Warn log', message.author.avatarURL)
  .setThumbnail('https://i.imgur.com/8dtPmtV.gif')
  .addField("Membre :", `<@${wUser.id}>`, true)
  .addField('Modérateur :', message.author, true)
  .addField('Raison :', reason, true)
  .addField("Nombre de warns :", warns[wUser.id].warns)
  .setTimestamp()
  .setFooter('Create by ANTOINEmp4');

  let warnchannel = message.guild.channels.find(`name`, "「📃」logs");

  let sendwarnEmbed = new Discord.RichEmbed()
  .setColor('#FF0000')
  .setAuthor('Tu a été warn !', message.author.avatarURL)
  .setThumbnail('https://i.imgur.com/8dtPmtV.gif')
  .addField('Serveur :', message.guild.name, true)
  .addField("Moderateur :", message.author.username, true)
  .addField('Raison :', reason, true)
  .addField("Nombre de warns :", warns[wUser.id].warns)
  .setTimestamp()
  .setFooter('Create by ANTOINEmp4');

  let autowarnEmbed = new Discord.RichEmbed()
  .setColor('#FF0000')
  .setAuthor('Warn log', message.author.avatarURL)
  .setThumbnail('https://i.imgur.com/8dtPmtV.gif')
  .addField("Membre :", `<@${wUser.id}>`, true)
  .addField('Raison :', reason, true)
  .addField("Nombre de warns :", warns[wUser.id].warns)
  .setTimestamp()
  .setFooter('Create by ANTOINEmp4');

  message.author.send(autowarnEmbed);
  wUser.send(sendwarnEmbed);
  warnchannel.send(warnEmbed);

  if(warns[wUser.id].warns == 2){
    let muterole = message.guild.roles.find(`name`, "muted");

    let mutetime = "10m";
    (wUser.addRole(muterole.id));
    let embed2 = new Discord.RichEmbed()
    .setColor('#FF0000')
    .setAuthor('Auto Mute log', message.author.avatarURL)
    .setThumbnail('https://i.imgur.com/8dtPmtV.gif')
    .addField('Membre :', wUser, true)
    .addField('Raison :', `2 warns`, true)
    .addField('Temps :', mutetime)
    .setTimestamp()
    .setFooter('Create by ANTOINEmp4');
    message.guild.channels.find("name", "「📃」logs").send(embed2)

    setTimeout(function(){
      wUser.removeRole(muterole.id)
      let embed2 = new Discord.RichEmbed()
      .setColor('GREEN')
      .setAuthor('UnMute log', 'https://i.imgur.com/8dtPmtV.gif')
      .setThumbnail('https://i.imgur.com/8dtPmtV.gif')
      .addField('Membre :', `${wUser} a été unmute!`)
      .setTimestamp()
      .setFooter('Create by ANTOINEmp4');
      message.guild.channels.find("name", "「📃」logs").send(embed2)
    }, ms(mutetime))
  }

  if(warns[wUser.id].warns == 3){
    let muterole = message.guild.roles.find(`name`, "muted");

    let mutetime = "6h";
    (wUser.addRole(muterole.id));
    let embed2 = new Discord.RichEmbed()
    .setColor('#FF0000')
    .setAuthor('Auto Mute log', message.author.avatarURL)
    .setThumbnail('https://i.imgur.com/8dtPmtV.gif')
    .addField('Membre :', wUser, true)
    .addField('Raison :', `3 warns`, true)
    .addField('Temps :', mutetime)
    .setTimestamp()
    .setFooter('Create by ANTOINEmp4');
    message.guild.channels.find("name", "「📃」logs").send(embed2)

    setTimeout(function(){
      wUser.removeRole(muterole.id)
      let embed2 = new Discord.RichEmbed()
      .setColor('GREEN')
      .setAuthor('UnMute log', 'https://i.imgur.com/8dtPmtV.gif')
      .setThumbnail('https://i.imgur.com/8dtPmtV.gif')
      .addField('Membre :', `${wUser} a été unmute!`)
      .setTimestamp()
      .setFooter('Create by ANTOINEmp4');
      message.guild.channels.find("name", "「📃」logs").send(embed2)
    }, ms(mutetime))
  }
  
  if(warns[wUser.id].warns == 4){
    message.guild.member(wUser).ban(reason);
    let embed2 = new Discord.RichEmbed()
    .setColor('#FF0000')
    .setAuthor('Auto Ban log', message.author.avatarURL)
    .setThumbnail('https://i.imgur.com/8dtPmtV.gif')
    .addField('Membre :', wUser, true)
    .addField('Raison :', `4 warns`, true)
    .setTimestamp()
    .setFooter('Create by ANTOINEmp4');
    message.guild.channels.find("name", "「📃」logs").send(embed2)
  }

}