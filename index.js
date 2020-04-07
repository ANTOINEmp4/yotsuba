const Discord = require('discord.js')
const client = new Discord.Client();
let coins = require("./coins.json");
let xp = require("./xp.json");
const createCaptcha = require('./captcha.js');
const fs = require('fs').promises;
const guildInvites = new Map();

const token = process.env.token;

const prefix = '!';

const ownerID = 'ANTOINEmp4';

const active = new Map();

client.on('inviteCreate', async invite => guildInvites.set(invite.guild.id, await invite.guild.fetchInvites()));

client.on("ready", () =>{
    console.log(`Connecté comme ${client.user.tag}!`);
    client.user.setPresence({
        status: "online",  
        game: {
            name: "Black clover",  
            type: "WATCHING" 
        }
    });
        client.guilds.forEach(guild => {
        guild.fetchInvites()
            .then(invites => guildInvites.set(guild.id, invites))
            .catch(err => console.log(err));
    });
 });
  
  client.on('message', message => {
    
      if (message.channel.type == "dm"){
    message.author.send("Je ne suis qu'un bot je ne peux pas comprendre votre réponse.").then(msg => {
      msg.delete(10000)
    });
    return;
  }else{

	let msg = message.content.toUpperCase();
	let sender=message.author;
  let args = message.content.slice(prefix.length).trim().split(' ');
  let cmd = args.shift().toLowerCase();
  if (!msg.startsWith(prefix)) return;
  if (message.author.bot) return;
  try {
    delete require.cache[require.resolve(`./commands/${cmd}.js`)];
    let ops = {
      ownerID: ownerID,
      active: active
    }
    let commandFile = require(`./commands/${cmd}.js`);
    commandFile.run(client, message, args, ops);
    
  } catch (e) {
    console.log(e.stack);
  }  finally {
    console.log(`${message.author.tag} a utilisé la commande ${cmd}`);}
    if (message.content === prefix+'avatar') {
      // Send the user's avatar URL
      message.reply(message.author.avatarURL);
    }
}
    
    if(message.author.bot) return;
    if(!message.guild) return;
    if(message.channel === message.guild.channels.find('name', '「📃」logs')){
      message.delete();
    }else{
    let msg = message.content.toUpperCase();
    if (msg.startsWith(prefix)) return;
    let chaine = message.guild.channels.find('name', '「📃」logs');
    let embed2 = new Discord.RichEmbed()
    .setColor('#0099ff')
    .setDescription('Message log')
    .setThumbnail('https://i.imgur.com/dIVB9jf.png')
    .addField('Channel :', message.channel)
    .addField("Auteur :", message.author.username, true)
    .addField('Contenu du message :', message)
    .setTimestamp()
    .setFooter('Create by ANTOINEmp4');
  message.guild.channels.find("name", "「📃」logs").send(embed2)
    
    let logs = message.guild.channels.find('name', '「📃」logs');
    if (message.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
    message.guild.createChannel('「📃」logs', 'text');
    }
    if (!message.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) { 
    console.log('Le salon logs n\'existe pas et j\'ai essayer de le créer mais je n\'ai pas les permissions !')
    }  
    let blacklisted = ['🖕', 'fdp', 'ntm', 'espece', 'espèce', 'connard', 'pute', 'putain', 'ta gueule', 'nique', 'salope', 'PD', 'batard', 'putin', 'enfoiré', 'connare', 'fils de pute', 'bâtard', 'bicot', 'conasse', 'couille molle', 'débile', 'ducon', 'dugland', 'enculé', 'fachiste', 'imbécile', 'lavette', 'zebi', 'Zebi'];
    let foundInText = false;
    if(message.member.hasPermission('KICK_MEMBERS')){
      
    }else{
    for (var i in blacklisted) {
    if (message.content.toLowerCase().includes(blacklisted[i].toLowerCase())) foundInText = true;
    }
    if (foundInText) {
    let logs = message.guild.channels.find('name', '「📃」logs');
    message.delete();
    let embed = new Discord.RichEmbed()
      .addField("Effectuée sur le Channel", message.channel)
      .setTitle(`Insulte provenant de : ${message.author.username}`)
      .setColor("#FF0000")
      .addField("Contenu du message :", `${message.content.toLowerCase()}`)
    message.guild.channels.find("name", "「📃」logs").send(embed)
    }
  }

  if(!coins[message.author.id]){
    coins[message.author.id] = {
      coins: 0
    };
  }

  let coinAmt = Math.floor(Math.random() * 15) + 1;
  let baseAmt = Math.floor(Math.random() * 15) + 1;
  console.log(`${coinAmt} ; ${baseAmt}`);
      
  if(!coins[message.author.id] === '∞') {
    

  if(coinAmt === baseAmt){
    coins[message.author.id] = {
      coins: coins[message.author.id].coins + coinAmt
    };
  fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
    if (err) console.log(err)
  });
  let coinEmbed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setColor("#0000FF")
  .addField("💸", `${coinAmt} money ajoutée!`);

  message.channel.send(coinEmbed).then(msg => {msg.delete(5000)});
  }
  }

  let xpAdd = Math.floor(Math.random() * 7) + 8;
  console.log(xpAdd);

  if(!xp[message.author.id]){
    xp[message.author.id] = {
      xp: 0,
      level: 1
    };
  }

  let curxp = xp[message.author.id].xp;
  let curlvl = xp[message.author.id].level;
  let nxtLvl = xp[message.author.id].level * 150;
  xp[message.author.id].xp =  curxp + xpAdd;
  if(nxtLvl <= xp[message.author.id].xp){
    xp[message.author.id].level = curlvl + 1;
    let lvlup = new Discord.RichEmbed()
    .setTitle("Niveau Supérieur!")
    .setColor('PURPLE')
    .addField("Niveau actuel", curlvl + 1);

    message.channel.send(lvlup).then(msg => {msg.delete(5000)});
  }
    
  fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
    if(err) console.log(err)
  });
  }
  });  
  
client.on('guildMemberAdd', async member => {
  const verificationchannel = member.guild.channels.find('name', 'verification');
    const captcha = await createCaptcha();
    try {
        const msg = await verificationchannel.send('Verification : Réecrit ce que tu vois sur cette image, tu as 60 secondes !', {
            files: [{
                attachment: `${__dirname}/captchas/${captcha}.png`,
                name: `${captcha}.png`
            }]
        });
        try {
            const filter = m => {
                if(m.author.bot) return;
                if(m.author.id === member.id && m.content === captcha) return true;
                else {
                    m.channel.send('Le code que tu as rentré ne correspond pas au code de l\'image.');
                    return false;
                }
            };
            const response = await msg.channel.awaitMessages(filter, { max: 1, time: 20000, errors: ['time']});
            if(response) {
                await msg.channel.send('Bien, le code que tu as rentré est correct tu as maintenant accès au autres salon!');
                await member.addRole('596712819999768627');
                await fs.unlink(`${__dirname}/captchas/${captcha}.png`)
                    .catch(err => console.log(err));
            const cachedInvites = guildInvites.get(member.guild.id);
    const newInvites = await member.guild.fetchInvites();
    guildInvites.set(member.guild.id, newInvites);
    try {
        const usedInvite = newInvites.find(inv => cachedInvites.get(inv.code).uses < inv.uses);
      const image = member.user.avatarURL;
      if(!image){
        image = 'https://i.imgur.com/8dtPmtV.gif';
      }
        const embed = new Discord.RichEmbed()
            .setColor('RED')
            .setDescription(`Tu es le ${member.guild.memberCount} ème membre du serveur.\nInvité par ${usedInvite.inviter} qui a ${usedInvite.uses} invitations`)
            .setTimestamp()
            .setFooter('Create by ANTOINEmp4')
            .setAuthor(`Un nouveau sur le serveur`, 'https://i.imgur.com/8dtPmtV.gif')
            .setTitle(`Bienvenue à toi ` + member.user.username)
            .setThumbnail(image);
          let welcomeChannel = member.guild.channels.find('name', '「🎧」bienvenue');
        if(welcomeChannel) {
            welcomeChannel.send(embed).catch(err => console.log(err));
        }
    }
    catch(err) {
        console.log(err);
    }
              verificationchannel.bulkDelete(25);
              member.send('Pense à regarder le règlement pour ne pas te faire sanctionner même si c\'est comme sur la plupart des serveurs')
            }
        }
        catch(err) {
            console.log(err);
            await msg.channel.send('Tu n\'as pas resolu le captcha dans le temps imparti.');
            await member.kick();
            verificationchannel.bulkDelete(25);
            await fs.unlink(`${__dirname}/captchas/${captcha}.png`)
                    .catch(err => console.log(err));
        }
    }
    catch(err) {
        console.log(err);
    }
});


client.login(token);