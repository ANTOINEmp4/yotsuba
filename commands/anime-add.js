const Discord = require('discord.js');
const Kitsu = require('kitsu.js');
const fs = require("fs");
const kitsu = new Kitsu();
var aq = require('animequote');
const fetch = require("node-fetch")
let liste = JSON.parse(fs.readFileSync("./liste.json", "utf8"));
let liste2 = JSON.parse(fs.readFileSync("./listeanime.json", "utf8"));

module.exports.run = async (bot, message, args) => {
   if (!args[0]) {
     return message.channel.send("Rentrez le nom d\'un animé");
      
    }
    //main part
        var search = message.content.split(/\s+/g).slice(1).join(" ");
        kitsu.searchAnime(search).then(async result => {
            if (result.length === 0) {
                return message.channel.send(`Pas de resultat pour : **${search}**!`);
            }
            message.delete()
          
          var anime = result[0]
          if(liste2[anime.titles.english]){
            message.channel.send('Cet animé est deja dans la liste')
            return
          }

            let embed = new Discord.RichEmbed()
                .setColor('GREEN')
                .setTitle(`Demande d'ajout d'animé à la liste`)
                .setDescription("Nom : " + anime.titles.english)
                .setFooter('Ne réagissez que si vous avez déjà vu cet animé')
                .addField(`Réagissez par oui ou non selon votre choix`, 'Demandé par ' + message.author)
                .setThumbnail(anime.posterImage.original, 200, 200);
            let msg = await message.guild.channels.find("name", "「📢」anonces").send({ embed })
            await msg.react("✅")
            await msg.react("❌")
            var c = 40;
          
        setInterval(function () {
          c = c - 1;
            if (c == 0) {
            var peopleyes = msg.reactions.get("✅").users.array();
            var peopleno = msg.reactions.get("❌").users.array();
              if(peopleno === 0 && peopleyes === 0) return message.send(`Personne n'a voté :(`)
              if(peopleno > peopleyes) return message.channel.send(`Il y a plus de votes pour non`)
              if(peopleno === peopleyes) return message.channel.send(`Il y a autant de vote recommence plus tard ^^`)
              if(peopleno < peopleyes){
                let name = anime.titles.english
                let addembed = new Discord.RichEmbed()
                .setColor('GREEN')
                .setTitle(`Animé ajouté dans la liste !`)
                .setDescription("Nom : " + anime.titles.english)
                .setFooter(`Merci d'avoir voter`)
                .addField(`Je vous conseille donc de regarder cet animé`, 'Demandé par ' + message.author)
                .setThumbnail(anime.posterImage.original, 200, 200);
                  message.guild.channels.find("name", "「📢」anonces").send(addembed)
                let dmaddembed = new Discord.RichEmbed()
                .setColor('GREEN')
                .setTitle(`Ton animé a été ajouté dans la liste !`)
                .setDescription("Nom : " + anime.titles.english)
                .setFooter(`Merci d'avoir proposé cet animé`)
                .setThumbnail(anime.posterImage.original, 200, 200);
                  message.author.send(dmaddembed)
                  liste["Animés"].push(`"${name}"`);
                  fs.writeFile("./liste.json", JSON.stringify(liste), (err) => {
                  });



                  liste2 [anime.titles.english] = {
                    name: anime.titles.english
                  };
                  fs.writeFile("./listeanime.json", JSON.stringify(liste2), (err) => {
                  });
              }
            }
  }, 200)
        })
}