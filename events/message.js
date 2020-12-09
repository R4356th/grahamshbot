const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
var fs = require("fs");
var verbs = fs.readFileSync("./verbs.txt").toString().split("\n");
module.exports = (client, message) => {
  const Discord = require("discord.js");
  var randomSentence = require("random-sentence");
  var Sentencer = require("sentencer");
  Sentencer.configure({
    actions: {
      verb: function () {
        return verbs[verbs.length * Math.random() | 0]
      },
    },
  });

  const prefix = "g!";
  const prefixRegex = new RegExp(
    `^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`
  );
  if (!prefixRegex.test(message.content)) return;
  const [, matchedPrefix] = message.content.match(prefixRegex);
  const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  console.log(message.content + " -" + message.author);
  const Help = new Discord.RichEmbed()
    .setColor("#0099ff")
    .setTitle("GrahamSH-Bot Help")
    .setAuthor(
      "GrahamSH-Bot",
      "https://uploads.scratch.mit.edu/users/avatars/14542217.png",
      "https://grahamsh-llk.github.io"
    )
    .setDescription("Help for the GrahamSH-Bot.")
    .addField("g!help", "Get help", true)
    .addField("g!say", "Have the bot say... something!", true)
    .setImage("https://uploads.scratch.mit.edu/users/avatars/14542217.png")
    .setTimestamp()
    .setFooter(
      "Some footer text here",
      "https://uploads.scratch.mit.edu/users/avatars/14542217.png"
    );
  if (message.author != "<@777212456170422272>") {
    if (command === "say") {
      if (args) {
        message.channel.send(
          "Hahahaha! I'll never say what you want! " +
            randomSentence({ min: 4, max: 9 })
        );
      }
    } else if (command === "help") {
      message.channel.send(Help);
    } else if (command === "ping") {
      message.channel.send(
        `🏓 Latency is ${
          Date.now() - message.createdTimestamp
        }ms. API Latency is ${Math.round(client.ws.ping)}ms`
      );
    } else if (command === "madlibs") {
      message.channel.send(
        Sentencer.make(
          message.content.replace(matchedPrefix, "").replace(command, "")
        )
      );
    } else if (command === "holiday") {
      message.channel.send(":santa:  Happy holidays, " + message.author);
    } else if (command === "gtg") {
      message.channel.send(message.author + " has to go!");
    } else {
      message.channel.send("Sadly, that's *not* a command.");
    }
  }
};
