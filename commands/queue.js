exports.run = async (client, message, args, ops) => {
  
  let fetched = ops.active.get(message.guild.id);
  
  if (!fetched) return message.channel.send('La file d\'attente est vide');
  
  let queue = fetched.queue;
  
  let nowPlaying = queue[0];
  
  let resp = `__**Je joue**__\n**${nowPlaying.songTitle}** -- **Demandée par:** ${nowPlaying.requester}\n\n__**File d'attente**__\n`;
  
  for (var i=1; i < queue.length; i++) { 
    resp += `${i}. **${queue[i].songTitle}** -- **Demandée par:** ${queue[i].requester}\n`;
  }
  message.channel.send(resp);

}