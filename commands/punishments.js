const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

exports.run = (client, message, args, ops) => {

    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  
  if(!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };
  
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Tu n'as pas la perm.");
  if(!wUser) return message.reply("Mettre un user");
  let warnlevel = warns[wUser.id].warns;

  message.reply(`<@${wUser.id}> a ${warnlevel} warnings.`);

}