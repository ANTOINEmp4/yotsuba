const yts = require('yt-search');
const Discord = require('discord.js');

exports.run = async (client, message, args, ops) => {

    let search = args.slice(0).join(" ");

    message.delete();
    yts( search, function ( err, r ) {
        if ( err ) throw err
   
        const videos = r.videos.slice(0, 1);
        videos.forEach( function ( v ) {
        const views = String( v.views ).padStart( 10, ' ' )
        console.log( `${ views } | ${ v.title } (${ v.timestamp }) | ${ v.author.name }` )
    
        let embed = new Discord.RichEmbed()
        .setColor('GREEN')
        .setAuthor(`Info sur ta recherche :`, message.author.avatarURL, v.url)
        .setThumbnail(v.image)
        .addField(`**Titre :**`, v.title, true)   
        .addField(`**Description :**`,v.description, true)
        .addField(`**Nombre de vues :**`, views, true)
        .addField(`**Chaine :**`, v.author.name, true)
        .addField(`**Durée :**`, v.timestamp, true)
        .addField(`**Il y a :**`, v.ago, true)
        .setTimestamp()
        .setFooter('Create by ANTOINEmp4');
        message.author.send(embed);
        });
    });
}