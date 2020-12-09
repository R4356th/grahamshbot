module.exports = (client, message) => {
  const Discord = require("discord.js")
  var randomSentence = require('random-sentence');
  var Sentencer = require('sentencer');
  const prefix = 'g!'
  console.log(message.content + ' -' + message.author)
const Help = new Discord.RichEmbed()
	.setColor('#0099ff')
	.setTitle('GrahamSH-Bot Help')
	.setAuthor('GrahamSH-Bot', 'https://uploads.scratch.mit.edu/users/avatars/14542217.png', 'https://grahamsh-llk.github.io')
	.setDescription('Help for the GrahamSH-Bot.')
	.addField('g!help', 'Get help', true)
	.addField('g!say', 'Have the bot say... something!', true)
	.setImage('https://uploads.scratch.mit.edu/users/avatars/14542217.png')
	.setTimestamp()
	.setFooter('Some footer text here', 'https://uploads.scratch.mit.edu/users/avatars/14542217.png');
  if (message.content.startsWith(prefix) && message.author != '<@777212456170422272>') {
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    console.log(args[2])
    if (command === 'say') {
        if (args) {
        message.channel.send("Hahahaha! I'll never say what you want! " + randomSentence({min: 4, max: 9}))
        }
      
    } else if (command === 'help') {
      message.channel.send(Help)
    } else if (command === 'ping') {
      message.channel.send(`🏓 Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
    } else if (command === 'madlibs'){
      message.channel.send(Sentencer.make(message.content.slice(9)));
    } else if (command === 'holiday'){
    message.channel.send(':santa:  Happy holidays, ' + message.author);
  }
     else {
      message.channel.send("Sadly, that's *not* a command.")
    }


  }
}