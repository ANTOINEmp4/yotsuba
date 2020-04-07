const Discord = require("discord.js")


module.exports.run = async (bot, message, args) => {
  
  if(args[0] == 'admin'){
      if (message.member.hasPermission("BAN_MEMBERS")) {
        message.delete();
        let embed = new Discord.RichEmbed()
        .setAuthor(`Tu as demandé de l'aide ?`, message.guild.iconURL)
        .setColor("ea0e0e")
        .setDescription(`${message.author.username} regarde tes message privés!`)

        let Sembed = new Discord.RichEmbed()
        .setColor("008B8B")
        .setAuthor(`Voici votre demande d'aide`, message.author.avatarURL)
        .setThumbnail(message.author.avatarURL)
        .setTimestamp()
        .setDescription(`Voici la liste des commandes disponible pour les modérateur!\nLe prefix est: **!**`)
        .addField(`Commands:`, "``add-money`` ``ban`` ``gcreate`` ``kick`` ``punishments`` ``purge`` ``rules`` ``temp-mute`` ``warn``")
        .setFooter("Create by ANTOINEmp4", bot.user.displayAvatarURL)
        message.channel.send(embed).then(m => m.delete(10000));
        message.author.send(Sembed)
      }
  }

    if(!args[0]) {
        message.delete();
        let embed = new Discord.RichEmbed()
        .setAuthor(`Tu as demandé de l'aide ?`, message.guild.iconURL)
        .setColor("ea0e0e")
        .setDescription(`${message.author.username} regarde tes message privés!`)

        let Sembed = new Discord.RichEmbed()
        .setColor("008B8B")
        .setAuthor(`Voici votre demande d'aide`, message.author.avatarURL)
        .setThumbnail(message.author.avatarURL)
        .setTimestamp()
        .setDescription(`Voici la liste des commandes disponible!\nLe prefix est: **!**`)
        .addField(`Commands:`, "``homer`` ``nezuko`` ``yotsuba`` ``help`` ``meteo`` ``play`` ``stop`` ``pause`` ``resume`` ``queue`` ``volume`` ``skip`` ``search`` ``info`` ``anime`` ``anime-add`` ``liste`` ``rank`` ``money``")
        .setFooter("Create by ANTOINEmp4", bot.user.displayAvatarURL)
        message.channel.send(embed).then(m => m.delete(10000));
        message.author.send(Sembed)
    }
}