const ytdl = require('ytdl-core');
exports.run = async (client, message, args, ops) => {
    if (!message.member.voiceChannel) return message.channel.send('Connectes toi à un salon vocal');


    if (!args[0]) return message.channel.send('Entres une URL');
    let validate = await ytdl.validateURL(args[0]);
  
    

    if (!validate) {
        let search = args.slice(0).join(" ");
        message.channel.send(`:mag_right: **Je cherche** \`${search}\``)
      let commandFile = require('./search.js');
      return commandFile.run(client, message, args, ops);
    
    }

    let info = await  ytdl.getInfo(args[0]);

   let data = ops.active.get(message.guild.id) || {};
    if (!data.connection) data.connection = await message.member.voiceChannel.join();
    if(!data.queue) data.queue = [];
    data.guildID = message.guild.id;

    data.queue.push({
        songTitle: info.title,
        requester: message.author.tag,
        url: args[0],
        announceChannel: message.channel.id

    });

    if (!data.dispatcher) play(client, ops, data);
    else {
        
        yts( info.title, function ( err, r ) {
            if ( err ) throw err
           
            const videos = r.videos.slice(0, 1);
            videos.forEach( function ( v ) {
              const views = String( v.views ).padStart( 10, ' ' )
              console.log( `${ views } | ${ v.title } (${ v.timestamp }) | ${ v.author.name }` )
              // let channeled = getArtistTitle('Sword Art Online: Alicization - War of Underworld Ending Full『LiSA - unlasting』');
              // message.channel.send(`**J'ai ajouté:** \`${info.title}\` à la file d'attente!`)
              let embed = new Discord.RichEmbed()
              .setColor('#000000')
              .setTitle(v.title)
              .setURL(v.url)
              .setAuthor('Ajoutée a la file d\'attente', message.author.avatarURL, 'https://www.youtube.com/channel/UCU1QcB4sGz6QQlgzeXJyGRQ')
              .setThumbnail(v.image)
              .addField('Chaine   ', v.author.name, true)
              .addField('Durée    ', v.timestamp, true)
              .addBlankField()
              .setTimestamp()
              .setFooter('Create by ANTOINEmp4');
              message.channel.send(embed)
            } )
        } )
    }
    ops.active.set(message.guild.id, data);


}
async function play(client, ops, data) {
    client.channels.get(data.queue[0].announceChannel).send(`**Je joue** :notes: \`${data.queue[0].songTitle}\` - Maintenant!`);

    data.dispatcher = await data.connection.playStream(ytdl(data.queue[0].url, {filter: 'audio', quality: 'highest'}));
    data.dispatcher.guildID = data.guildID;

    data.dispatcher.once('end', function() {
        end(client, ops, this);

    });

}
function end(client, ops, dispatcher){

    let fetched = ops.active.get(dispatcher.guildID);

    fetched.queue.shift();

    if (fetched.queue.length > 0) {
        ops.active.set(dispatcher.guildID, fetched);
        play(client, ops, fetched);
    } else {
        ops.active.delete(dispatcher.guildID);
        let vc = client.guilds.get(dispatcher.guildID).me.voiceChannel;  
        
        if (vc){
            vc.leave();
        }
        
    }

}