exports.run = async (client, message, args, ops) => {
    
    message.author.send(`${message.author} -> Tu as dit Allahu Akbar ? https://tenor.com/7nen.gif`).then(msg => {
            msg.delete(8000)
          });
    message.delete();
  }