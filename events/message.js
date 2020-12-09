module.exports = (client, message) => {
  const Discord = require("discord.js")
  const prefix = 'g!'
  //console.log(message.content + ' -' + message.author.username)
const Help = new Discord.RichEmbed()
	.setColor('#0099ff')
	.setTitle('GrahamSH-Bot Help')
	.setAuthor('GrahamSH-Bot', 'https://uploads.scratch.mit.edu/users/avatars/14542217.png', 'https://grahamsh-llk.github.io')
	.setDescription('Help for the GrahamSH-Bot.')
	.addBlankField()
	.addField('g!help', 'Get help', true)
	.addField('g!say', 'Have the bot say... something!', true)
	.addField('More coming!', 'SOON', true)
	.setImage('https://uploads.scratch.mit.edu/users/avatars/14542217.png')
	.setTimestamp()
	.setFooter('Some footer text here', 'https://uploads.scratch.mit.edu/users/avatars/14542217.png');
  if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    console.log(args[2])
    if (command.startsWith('say')) {
      if (args[1] != 'I say *nothing*.') {
        message.channel.send('I say *nothing*.')
      }
    } else if (command === 'help') {
      message.channel.send(Help)
    } else if (command === 'ping') {
      message.channel.send(`🏓 Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
    }
    else {
      message.channel.send("Sadly, that's *not* a command.")
    }


  }
}