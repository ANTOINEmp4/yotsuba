exports.run = async (client, message, args, ops) => {
    
    message.author.send(`Salut ! https://tenor.com/view/fairy-tail-smiling-natsu-dragneel-happy-gif-16216127`).then(msg => {
            msg.delete(8000)
          });
    message.delete();
  }