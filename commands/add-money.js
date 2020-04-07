const Discord = require("discord.js");
const fs = require("fs");
let coins = require("../coins.json");

module.exports.run = async (bot, message, args) => {
    
    let pUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if (message.member.hasPermission("KICK_MEMBERS")) {
    if(!coins[pUser.id]){
    coins[pUser.id] = {
      coins: 0
    };
  }
  let pCoins = coins[pUser.id].coins;
  if(args[1] === 'infinity'){
    coins[pUser.id] = {
    coins: "∞"}
        message.author.send(`Tu as ajouté la money infinie à ${pUser}`);
  }else{
  
    coins[pUser.id] = {
    coins: pCoins + parseInt(args[1])
  };

    message.author.send(`Tu as ajouté ${args[1]} money à ${pUser}`);
  }

  fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
  });
    }else{
      message.reply('Tu n\'as pas la permission d\'exucuter cette commande !')
    }
  
}