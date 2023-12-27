import { Telegraf, Markup } from "telegraf";
import "dotenv/config";

import { start, help } from "./middleware/bassicCommand.js";
import { search } from "./middleware/search.js";
// const { Telegraf } = require('telegraf')
// const { message } = require('telegraf/filters')

const bot = new Telegraf(process.env.BOT_TOKEN);

// bassic command
bot.start(start)
bot.help(help)

// main command
bot.command("search", search);

// const nama = [
//   'Asus TUF A15  FA507.',
//   'Asus TUF A16 Advantage Edition  FA617.',
//   'Asus TUF A17  FA706.',
//   'Asus TUF A17  FA707.',
//   'Asus TUF F15  FX506.',
//   'Asus TUF F15  FX507.',
//   'Asus TUF Dash 15  FX516.',
//   'Asus TUF Dash 15  FX517.',
//   'Asus TUF F17  FX706.',
//   'Asus TUF F17  FX707.'
// ];

bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.launch()