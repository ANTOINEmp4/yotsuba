exports.run = async (client, message, args, ops) => {
    if (!message.member.voiceChannel) return message.channel.send('Plz connectes toi a un channel');

    if (!message.guild.me.voiceChannel) return message.channel.send('Dsl le bot est pas connecte ds un channel vcal');
    if (message.guild.me.voiceChannelID !== message.member.voiceChannelID) return message.channel.send('Dsl tu est pas connecte dans le meme channel vocal que le bot');

    message.guild.me.voiceChannel.leave();



}