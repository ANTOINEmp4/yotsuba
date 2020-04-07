const Discord = require("discord.js");
const fs = require("fs");
let coins = require("../coins.json");

module.exports.run = async (bot, message, args) => {
    
    let pUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if (message.member.hasPermission("KICK_MEMBERS")) {
      let pCoins = coins[pUser.id].coins;
  if(args[1] === 'infinity'){
    if(pCoins !== '∞')return message.author.send(`Ce joueur n'a pas la money infinie !`);
    coins[pUser.id] = {
    coins: 0}
  message.author.send(`Tu as retiré la money infinie à ${pUser}`);
    fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
  });
  }else{
    if(!coins[pUser.id]){
    coins[pUser.id] = {
      coins: 0
    };
      message.author.send("Cet utilisateur n'avait aucune money !")
      return;
  }
  
  if(pCoins < args[1]){
    message.author.send('Cet utilisateur as moins de money que le nombre de money que vous voulez lui retirer')
    return;
  }
  
    coins[pUser.id] = {
    coins: pCoins - parseInt(args[1])
  };

    message.author.send(`Tu as retiré ${args[1]} money à ${pUser}`);
  }
    }else{
      message.reply('Tu n\'as pas la permission d\'exucuter cette commande !')
    }
  fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
  });
  
}