exports.run = (client, message, args, ops) => {

    if(!message.member.voiceChannel) return message.channel.send(`Tu n'es pas connecté à un salon vocal !`);

    if(!message.guild.me.voiceChannel) return message.channel.send(`Je ne suis pas connecté à un salon !`);

    if(message.guild.me.voiceChannelID !== message.member.voiceChannelID) return message.channel.send(`Tu n'es pas connecté au même salon que moi`);

    message.guild.me.voiceChannel.leave();

    message.channel.send("Arrêt de la musique...");
}