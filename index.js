require('dotenv').config();
const EzBot = require('@notekunn/ezbot');
const path = require('path');
const bot = new EzBot({
  email: process.env.EMAIL,
  password: process.env.PASSWORD,
  appStatePath: path.resolve(__dirname, './appstate.json'),
});

const ping = require('./plugins/ping/');
bot.register(ping);

bot.start();
