exports.run = async (client, message, args, ops) => {
  let fetched = ops.active.get(message.guild.id);
  ops.active.set(message.guild.id, fetched);
    message.channel.send(':fast_forward: Musique Suivante :thumbsup:');
    fetched.connection.dispatcher.end();
}