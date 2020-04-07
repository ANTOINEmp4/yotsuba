exports.run = async (client, message, args, ops) => {
    
    message.author.send(`Uesugi-san !! https://tenor.com/3LlG.gif`).then(msg => {
            msg.delete(8000)
          });
    message.delete();
  }