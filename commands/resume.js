exports.run = (client, message, args, ops) => {
  let fetched = ops.active.get(message.guild.id);
  
  if (!fetched) return message.channel.send('Aucune musique n\'est jouee pour le moment');
  
  if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send('Tu n\'est pas connecté à un channel vocal');
  
  if (!fetched.dispatcher.paused) return message.channel.send('la musique n\'est pas en pause');
  
  fetched.dispatcher.resume();
  
  message.channel.send(`Musique en cours: ${fetched.queue[0].songTitle}`);

}