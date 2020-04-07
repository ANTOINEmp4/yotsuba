exports.run = async (client, message, args, ops) => {
    
    message.author.send(`Kawaii !! https://tenor.com/ba3sj.gif`).then(msg => {
            msg.delete(8000)
          });
    message.delete();
  }