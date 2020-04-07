const Discord = require('discord.js');
exports.run = async (client, message, args, ops) => {

    const embed = new Discord.RichEmbed();
    embed.setTitle(':crown: BIENVENUE SUR MON SERVEUR ! :crown:');
    embed.setColor('ORANGE');
    embed.setDescription(`\n


    :warning: Avant d'aller plus loin voici les 6 commandements à respecter sur ce serveur :warning: 
    
    
    :one: Avoir un comportement correct :
    Les propos ou images/photos à caractère pornographique, raciste, homophobe, sexiste, antisémite et politique sont interdits
    
    :two: Respecter les membres du serveur :
    Toutes formes de violences/insultes ou provocations, que ce soit dans les salons textuels, vocaux, ou réactions sont interdites
    
    :three: Ne pas faire de pub :
    Tout lien ou propos explicite, visant à promouvoir un autre serveur discord, une chaine youtube, une chaîne twitch.... est interdit (sans permission d'un modérateur ou d'un manager)
    
    :four: Pas de spam :
    Les messages full MAJ, comportant plus de 5 émojis, mentions inutiles, de façon répétitive, sont interdits
    
    :five: Respecter les salons :
    De nombreux salons textuels/vocaux sont à votre disposition ; merci de tenir compte des descriptions et de poster vos messages dans les bons salons
    
    :six: Vente/Transactions interdites :
    La vente/transaction de comptes, clés de jeux... ou tout autre contenu est strictement interdite
    
    
    :rotating_light: TOUTE PERSONNE NE RESPECTANT PAS LES REGLES ENUMEREES CI-DESSUS FERA L'OBJET DE SANCTIONS POUVANT ALLER DU SIMPLE AVERTISSEMENT, JUSQU'AU BANNISSEMENT DEFINITIF DU SERVEUR :rotating_light: 
`)
message.channel.send({embed: embed});
}