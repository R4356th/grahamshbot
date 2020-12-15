require("dotenv").config()
const Discord = require("discord.js")
const fs = require("fs")
const SQLite = require("better-sqlite3");
const sql = new SQLite("./scores.sqlite");
const client = new Discord.Client()
const Canvas = require('discord-canvas')
process.env.FONTCONFIG_PATH='./fonts';
const ejs = require('ejs')



fs.readdir("./events/", (err, files) => {
  files.forEach((file) => {
    const eventHandler = require(`./events/${file}`)
    const eventName = file.split(".")[0]
    client.on(eventName, (...args) =>  eventHandler(client, ...args))
  })
})

client.login(process.env.TOKEN)

/* SERVER */

/* Setup Express Js */
var express = require('express')
var app = express()
/* Express Config */
var listener = app.listen(process.env.PORT, () => {
    console.log(`Your app is listening on port ${listener.address().port}`);
});
/* Main Pages */
app.get("/", (request, response) => {
    response.redirect('https://grahamsh-llk.github.io')
}); 
app.get("/blog", (request, response) => {
    response.redirect('https://grahamsh-llk.github.io/blog')
}); 
app.get("/keepalive", (request, response) => {
    console.log('Kept alive!')
    response.send('Alive')
}); 
app.get('/picture/:userid', async function (req, res, next) {
  let userid = req.params.userid // returns user id
  let username = client.users.find(u => u.id === userid).username // returns username  this is working
  let userimage = client.users.find(u => u.id === userid)
  .avatarURL
  console.log(userimage)
  let data = client.getScore.get(userid, '785546956109250581');
  console.log(data)
  const level = sql
        .prepare(
          "SELECT * FROM scores WHERE guild = ? ORDER BY points DESC ;"
        )
        .all('785546956109250581');
        console.log(level)
      const image = await new Canvas.RankCard()
      .setXP("current", data.points)
      .setXP("needed", 100 + Math.floor(data.points / 100) * 100) // for now
      .setLevel(data.level)
      .setAvatar(userimage)
      .setUsername(username)
      .setBackground("https://grahamshbot.grahamsh.repl.co/gradient.jpg")
      .setAddon("reputation", false) // Reputation box
      .setAddon("badges", true) // Badges of success box
      .setAddon("rank-name", false) // Name of rank
      .setAddon("rank", false) // Rank of user
      .setOpacity("level", 0) // Level box
      .toAttachment();
      const file = image.toBuffer()
        res.set('Content-Type', 'image/png')
        res.send(file)
    
})
app.get('/gradient.jpg', (request, response) => {
  response.sendFile(__dirname + '/gradient1.jpg')
})
app.get('/users/:user/', async function (req, res, next) {
    let user = req.params.user // returns user id
   username = await client.users.find(u => u.username === user) // returns username  this is working

  console.log(username)
  user = req.params.user
  disc = req.params.disc 
  id = await username.id
  link = `https://grahamshbot.grahamsh.repl.co/picture/${id}`

        ejs.renderFile(__dirname + '/public/index.ejs', { user, disc, link }, (err, str) => {
            if (err) console.log(err)
            res.send(str)
        })
    
})
