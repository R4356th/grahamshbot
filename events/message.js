const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
var fs = require("fs");
var verbs = fs.readFileSync("./verbs.txt").toString().split("\n");
module.exports = async (client, message) => {
  
  var randomSentence = require("random-sentence");
  var Sentencer = require("sentencer");
  const SQLite = require("better-sqlite3");
  const sql = new SQLite("./scores.sqlite");
  const eco = require("discord-economy");
  const Canvas = require('discord-canvas')
  Discord = require("discord.js");
  process.env.FONTCONFIG_PATH='./fonts';
  const prefix = "g!";
  const prefixRegex = new RegExp(
    `^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`
  );
  //console.log(message.content + " -" + message.author.id);
  let score;

  if (message.guild) {
    score = client.getScore.get(message.author.id, message.guild.id);
    if (!score) {
      score = {
        id: `${message.guild.id}-${message.author.id}`,
        user: message.author.id,
        guild: message.guild.id,
        points: 0,
        level: 1,
      };
    }
    score.points++;
    curLevel = Math.floor(score.points / 100);
    if (score.level < curLevel) {
      score.level = curLevel;
      message.reply(
        `You've leveled up to level **${curLevel}**! Ain't that dandy?`
      );
      const attachment = new Discord.Attachment(`https://grahamshbot.grahamsh.repl.co/picture/${message.author.id}`,'rank.png')
       message.reply({files: [attachment]});
    }
    client.setScore.run(score);
  }
  if (!prefixRegex.test(message.content)) return;
  const [, matchedPrefix] = message.content.match(prefixRegex);
  const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (message.content.indexOf(prefix) !== 0) return;

  Sentencer.configure({
    actions: {
      verb: function () {
        return verbs[(verbs.length * Math.random()) | 0];
      },
    },
  });

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
    .addField("g!ping", "good description", true)
    .addField("g!madlibs", "good description", true)
    .addField("g!holiday", "good description", true)
    .addField("g!gtg", "good description", true)
    .addField("g!verbs", "good description", true)
    .addField("g!rank", "good description", true)
    .addField("g!give", "good description", true)
    .addField("g!leaderboard", "good description", true)
    .addField("\u200b", "\u200b", false)
    //.setImage("https://uploads.scratch.mit.edu/users/avatars/14542217.png")
    .setTimestamp()
    .setFooter(
      "Some footer text here",
      "https://uploads.scratch.mit.edu/users/avatars/14542217.png"
    );
  if (message.author != "<@777212456170422272>") {
        message.channel.startTyping();
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
    } else if (command === "verbs") {
      message.channel.send(
        Sentencer.make(
          "{{ verb }}, {{ verb }}, {{ verb }}, {{ verb }}, {{ verb }}, {{ verb }}, {{ verb }}, {{ verb }}, {{ verb }}, {{ verb }}, {{ verb }}, {{ verb }}, {{ verb }}, {{ verb }}, {{ verb }}, {{ verb }}, {{ verb }}, {{ verb }}, {{ verb }}, {{ verb }}, {{ verb }}, {{ verb }}, {{ verb }}, {{ verb }}, {{ verb }}, {{ verb }}, {{ verb }}, {{ verb }}, {{ verb }}, {{ verb }}, {{ verb }}, {{ verb }}, {{ verb }}, {{ verb }}, {{ verb }}, {{ verb }}, {{ verb }}, {{ verb }}, {{ verb }}, {{ verb }}, {{ verb }}, {{ verb }}, {{ verb }}, {{ verb }}, {{ verb }}, {{ verb }}, {{ verb }}, {{ verb }}"
        )
      );
    } else if (command === "rank") {
      const attachment = new Discord.Attachment(`https://grahamshbot.grahamsh.repl.co/picture/${message.author.id}`,'rank.png')
       message.reply({files: [attachment]});

    } else if (command === "give") {
      // Limited to guild owner - adjust to your own preference!
      if (
        message.author.id != message.guild.ownerID &&
        message.author.id != 567320070951403531
      )
        return message.reply("You're not the boss of me, you can't do that!");

      const user = message.mentions.users.first() || client.users.get(args[0]);
      if (!user)
        return message.reply("You must mention someone or give their ID!");

      const pointsToAdd = parseInt(args[1], 10);
      if (!pointsToAdd)
        return message.reply("You didn't tell me how many XP to give...");

      // Get their current points.
      let userscore = client.getScore.get(user.id, message.guild.id);
      // It's possible to give points to a user we haven't seen, so we need to initiate defaults here too!
      if (!userscore) {
        userscore = {
          id: `${message.guild.id}-${user.id}`,
          user: user.id,
          guild: message.guild.id,
          points: 0,
          level: 1,
        };
      }
      userscore.points += pointsToAdd;

      // We also want to update their level (but we won't notify them if it changes)
      let userLevel = Math.floor(0.1 * Math.sqrt(score.points));
      userscore.level = userLevel;

      // And we save it!
      client.setScore.run(userscore);

      return message.channel.send(
        `${user.tag} has received ${pointsToAdd} XP and now stands at ${userscore.points} XP.`
      );
    } else if (command === "leaderboard") {
      const top10 = sql
        .prepare(
          "SELECT * FROM scores WHERE guild = ? ORDER BY points DESC LIMIT 10;"
        )
        .all(message.guild.id);

      // Now shake it and show it! (as a nice embed, too!)
      const embed = new Discord.RichEmbed()
        .setTitle("Leaderboard")
        .setAuthor(client.user.username, message.guild.iconURL)
        .setDescription("Our top 10 XP leaders!")
        .setColor(0x00ae86);
      async function showLeader() {
        for (const data of top10) {
          user = await client.fetchUser(data.user);
          embed.addField(
            `${user.username}`,
            `${data.points} XP (level ${data.level})`
          );
        }
      }
      await showLeader();
      return message.channel.send({ embed });
    } else if (command === "daily") {
      var output = await eco.Daily(message.author.id);
      //output.updated will tell you if the user already claimed his/her daily yes or no.

      if (output.updated) {
        var profile = await eco.AddToBalance(message.author.id, 100);
        message.reply(
          `You claimed your daily coins successfully! You now own ${profile.newbalance} coins.`
        );
      } else {
        message.channel.send(
          `Sorry, you already claimed your daily coins!\nBut no worries, in ${output.timetowait} you can get your daily prize again!`
        );
      }
    } else if (command === "coinflip") {
      var flip = args[0]; //Heads or Tails
      var amount = args[1]; //Coins to gamble

      if (!flip || !["heads", "tails"].includes(flip))
        return message.reply("Please specify the flip, either heads or tails!");
      if (!amount)
        return message.reply("Specify the amount you want to gamble!");

      var output = await eco.FetchBalance(message.author.id);
      if (output.balance < amount)
        return message.reply(
          "You have fewer coins than the amount you want to gamble!"
        );

      var gamble = await eco
        .Coinflip(message.author.id, flip, amount)
        .catch(console.error);
      message.reply(`You ${gamble.output}! New balance: ${gamble.newbalance}`);
    } else if (command === "work") {
      //I made 2 examples for this command! Both versions will work!

      var output = await eco.Work(message.author.id, {
        failurerate: 10,
        money: Math.floor(Math.random() * 500),
        jobs: ["cashier", "shopkeeper", "village idiot", "lawyer"],
      });
      //10% chance to fail and earn nothing. You earn between 1-500 coins. And you get one of those 3 random jobs.
      if (output.earned == 0)
        return message.reply(
          "Awh, you did not do your job well so you earned nothing!"
        );

      message.channel.send(`${message.author.username}
You worked as a \` ${output.job} \` and earned :money_with_wings: ${output.earned}
You now own :money_with_wings: ${output.balance}`);
    } else if (command === "balance") {
      var output = await eco.FetchBalance(message.author.id);
      message.channel.send(
        `Hey ${message.author.tag}! You own ${output.balance} coins.`
      );
    } else if (command === "economy") {
      //If you use discord-economy guild based you can use the filter() function to only allow the database within your guild
      //(message.author.id + message.guild.id) can be your way to store guild based id's
      //filter: x => x.userid.endsWith(message.guild.id)

      //If you put a mention behind the command it searches for the mentioned user in database and tells the position.
      if (message.mentions.users.first()) {
        var output = await eco.Leaderboard({
          filter: (x) => x.balance > 50,
          search: message.mentions.users.first().id,
        });
        message.channel.send(
          `The user ${
            message.mentions.users.first().tag
          } is number ${output} on my leaderboard!`
        );
      } else {
        eco
          .Leaderboard({
            limit: 3, //Only takes top 3 ( Totally Optional )
            filter: (x) => x.balance > 50, //Only allows people with more than 100 balance ( Totally Optional )
          })
          .then(async (users) => {
            //make sure it is async

            if (users[0])
              var firstplace = await client.fetchUser(users[0].userid); //Searches for the user object in discord for first place
            if (users[1])
              var secondplace = await client.fetchUser(users[1].userid); //Searches for the user object in discord for second place
            if (users[2])
              var thirdplace = await client.fetchUser(users[2].userid); //Searches for the user object in discord for third place

            const embed = new Discord.RichEmbed()
              .setTitle("Economy")
              .setAuthor(client.user.username, message.guild.iconURL)
              .setDescription("The top 3 people in our economy!")
              .setColor(0x00ae86)
              .addField(
                `${(firstplace && firstplace.tag) || "Nobody Yet"}`,
                `${(users[0] && users[0].balance) || "None"}`
              )
              .addField(
                `${(secondplace && secondplace.tag) || "Nobody Yet"}`,
                `${(users[1] && users[1].balance) || "None"}`
              )
              .addField(
                `${(thirdplace && thirdplace.tag) || "Nobody Yet"}`,
                `${(users[2] && users[2].balance) || "None"}`
              );
            return message.channel.send({ embed });
          });
      }
    } else if (command === "transfer") {
      var user = message.mentions.users.first();
      var amount = args[1];

      if (!user)
        return message.reply("Reply the user you want to send money to!");
      if (!amount) return message.reply("Specify the amount you want to pay!");

      var output = await eco.FetchBalance(message.author.id);
      if (output.balance < amount)
        return message.reply(
          "You have fewer coins than the amount you want to transfer!"
        );

      var transfer = await eco.Transfer(message.author.id, user.id, amount);
      message.reply(
        `Transfering coins successfully done!\nBalance from ${message.author.tag}: ${transfer.FromUser}\nBalance from ${user.tag}: ${transfer.ToUser}`
      );
    } else if (command === "slots") {
      var amount = args[0]; //Coins to gamble

      if (!amount)
        return message.reply("Specify the amount you want to gamble!");

      var output = await eco.FetchBalance(message.author.id);
      if (output.balance < amount)
        return message.reply(
          "You have fewer coins than the amount you want to gamble!"
        );

      var gamble = await eco
        .Slots(message.author.id, amount, {
          width: 3,
          height: 1,
          emojis: ["7️⃣", "*️⃣", "5️⃣", "#️⃣", "⏺️", "🔃"],
        })
        .catch(console.error);
      message.channel.send(gamble.grid); //Grid checks for a 100% match vertical or horizontal.
      message.reply(`You ${gamble.output}! New balance: ${gamble.newbalance}`);
    } else if (command === "brb") {
      message.channel.send(message.author + " will be right back!");
    } else if (command === "ranklink") {
      message.channel.send(`Your link is https://grahamshbot.grahamsh.repl.co/picture/${message.author.id}`);
    } else {
      message.channel.send("Sadly, that's *not* a command.");
    }
  }
      message.channel.stopTyping();

};
