require("dotenv").config()
const Discord = require("discord.js")
const fs = require("fs")
const SQLite = require("better-sqlite3");
const sql = new SQLite("./scores.sqlite");
const client = new Discord.Client()
const canvas = require('discord-canvas')
process.env.FONTCONFIG_PATH='./fonts';


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

