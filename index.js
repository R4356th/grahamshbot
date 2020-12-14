require("dotenv").config()
const Discord = require("discord.js")
const fs = require("fs")
const jdenticon = require("jdenticon")
const client = new Discord.Client()
const { createCanvas, loadImage } = require('canvas')
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
app.get('/picture/:user', async function (req, res, next) {
  const width = 1200
  const height = 630

  const canvas = createCanvas(width, height)
  const context = canvas.getContext('2d')

  context.fillStyle = '#000'
  context.fillRect(0, 0, width, height)

  context.font = 'bold 70pt'
  context.textAlign = 'center'
  context.textBaseline = 'top'
  context.fillStyle = '#3574d4'

  const text = 'Hello, World!'

  const textWidth = context.measureText(text).width
  context.fillRect(600 - textWidth / 2 - 10, 170 - 5, textWidth + 20, 120)
  context.fillStyle = '#fff'
  context.fillText(text, 600, 170)

  context.font = 'bold 70pt'
  context.fillStyle = '#fff'
  context.fillText('flaviocopes.com', 600, 530)

  loadImage('https://grahamshbot.grahamsh.repl.co/picture/' + req.params.user).then(image => {
    context.drawImage(image, 340, 515, 70, 70)
    const buffer = canvas.toBuffer('image/png')
            res.set('Content-Type', 'image/png')
        res.send(buffer)

  })

    })
