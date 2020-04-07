const Discord = require("discord.js");
const fs = require("fs");
let coins = require("../coins.json");

module.exports.run = async (client, message, args) => {
  //!pay @isatisfied 59345

  if(!coins[message.author.id]){
    return message.reply("Tu n'as pas de coins!")
  }

  let pUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

  if(!coins[pUser.id]){
    coins[pUser.id] = {
      coins: 0
    };
  }

  let pCoins = coins[pUser.id].coins;
  let sCoins = coins[message.author.id].coins;

  if(sCoins < args[0]) return message.reply("Tu n'as pas assez de pièces!");
  
  if(sCoins === "∞"){
  
  coins[pUser.id] = {
    coins: pCoins + parseInt(args[1])
  };
  }else{

  coins[message.author.id] = {
    coins: sCoins - parseInt(args[1])
  };

  coins[pUser.id] = {
    coins: pCoins + parseInt(args[1])
  };
  }

  message.channel.send(`${message.author} a donné ${args[1]} money à ${pUser}`);

  fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
  });


}