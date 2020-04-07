exports.run = (client, message, args, ops) => {
  
  let fetched = ops.active.get(message.guild.id);
  
  if (!fetched) return message.channel.send('Aucune musique n\'est jouee pour le moment');
  
  if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send('Tu n\'est pas connecté à un channel vocal');
  
  if (isNaN(args[0]) || args[0] > 200 || args[0] < 0) return message.channel.send('Merci d\'entrer un nombre entre 0 et 200');
  
  fetched.dispatcher.setVolume(args[0]/100);
  
  message.channel.send(`Volume mis à ${args[0]}`)
  
}