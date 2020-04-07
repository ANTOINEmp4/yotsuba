const discord = require("discord.js");
 
module.exports.run = async (bot, message, args) => {
 
    var item = "";
    var time;
    var winnerCount;
 
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(`Tu n'as pas la permission d'executer cette commande !`)  .then(msg => {
        msg.delete(8000)
      })
 
 
    winnerCount = args[0];
    time = args[1];
    item = args.splice(2, args.length).join(' ');
 
    message.delete();

    
    var date = new Date().getTime();
    var dateTime = new Date(date + (time * 1000));
    
    message.channel.send("🎉 **GIVEAWAY** 🎉");
    function secondsToJhms(d) {
        d = Number(d);
        var j = Math.floor(d / 86400);
        var h = Math.floor(d % 3600 / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);
        
        var jDisplay = j > 0 ? j + (j == 1 ? " jour, " : " jours, ") : "";
        var hDisplay = h > 0 ? h + (h == 1 ? " heure, " : " heures, ") : "";
        var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
        var sDisplay = s > 0 ? s + (s == 1 ? " seconde" : " secondes") : "";
        return jDisplay + hDisplay + mDisplay + sDisplay; 
    }
        var giveawayEmbed = new discord.RichEmbed()
            .setTitle(item)
            .setDescription(`Réagissez avec 🎉 pour participer!\nTemps total: ${secondsToJhms(time)}\nLancé par: ${message.author}`)
            .setTimestamp();
        
    var embedSend = await message.channel.send(giveawayEmbed);
    embedSend.react("🎉");
 
    setTimeout(function () {
 
        var random = 0;
        var winners = [];
        var inList = false;
 
        var peopleReacted = embedSend.reactions.get("🎉").users.array();

        for (var i = 0; i < peopleReacted.length; i++) {
            if (peopleReacted[i].id == bot.user.id) {
                peopleReacted.splice(i, 1);
                continue;
            }
        }
 
        if (peopleReacted.length == 0) {
            return message.channel.send("Personne n'a participer :(");
        }
 
        if (peopleReacted.length < winnerCount) {
            return message.channel.send("Il y a trop peu de personne qui ont participé :(");
        }

        for (var i = 0; i < winnerCount; i++) {
 
            inList = false;
 
            random = Math.floor(Math.random() * peopleReacted.length);
 
            for (var y = 0; y < winners.length; y++) {
                if (winners[y] == peopleReacted[random]) {
                    i--;
                    inList = true;
                    break;
                }
            }
 
            if (!inList) {
                winners.push(peopleReacted[random]);
            }
 
        }
 
        for (var i = 0; i < winners.length; i++) {
            message.channel.bulkDelete(3);
            message.channel.send("Felicitation " + winners[i] + ` ! Vous avez gagné : **${item}**.`);
        }
 
    }, 1000 * time);
 
 
}
