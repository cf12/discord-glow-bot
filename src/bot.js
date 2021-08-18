const fs = require('fs')
const path = require('path')
const Discord = require('discord.js')
const https = require('https')
const bot = new Discord.Client()

// Loads configs
let config = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'config', 'config.json')))

// Event handler for when the bot's ready
bot.on('ready', () => {
  console.log(`INFO >> Bot started.`)
})

let randomMsgs = [
  'GODDAMN WHY IS THOMAS SO GAY',
  'I\'M GLOWING BITCH',
  'WASSUP BITCH',
  'GO DIE FGT',
  'Why do I exist?',
  'REEEEEEEE'
]

// Event handler for when the bot detects a message
bot.on('message', (msg) => {
  let botId = bot.user.toString()

  if (msg.content.toUpperCase().includes(botId)) {
    if (msg.content.toUpperCase().includes('GIF PL0X')) {
      let randLimit = Math.floor(Math.random() * 50)
      https.get(`https://api.giphy.com/v1/gifs/trending?api_key=${config.giphy_api_key}&limit=${randLimit}&rating=PG-13`, (res) => {
        let rawData = ''
        res.on('data', (data) => { rawData += data })
        res.on('end', () => {
          let gifEntries = JSON.parse(rawData).data
          msg.channel.send(`${msg.author.toString()}`, { file: gifEntries[randLimit - 1].images.fixed_height.url })
        })
        res.on('error', (err) => { if (err) throw err })
      })
      msg.channel.send({ file: 'https://cdn.discordapp.com/attachments/160891109231296512/341419262889558017/tumblr_okpobdtKfC1twgfw0o2_r1_500.gif' })
    } else if (msg.content.toUpperCase().includes('THOMAS')) {
    } else if (msg.content.toUpperCase().includes('DROP TEST')) {
      msg.channel.send({ file: 'https://cdn.discordapp.com/attachments/160891109231296512/341420895316738059/unknown.png' })
    } else {
      msg.channel.send(`${msg.author.toString()} **${randomMsgs[Math.floor(Math.random() * randomMsgs.length)]}**`)
    }
  }
})

bot.login(config.bot_token)
