import { Telegraf, Markup } from "telegraf";
import "dotenv/config";

import { start, help } from "./middleware/bassicCommand.js";
import { search } from "./middleware/search.js";
import { pagination } from "./middleware/pagination.js";
import { detail } from "./middleware/detail.js";
// const { Telegraf } = require('telegraf')
// const { message } = require('telegraf/filters')

const bot = new Telegraf(process.env.BOT_TOKEN);

// bassic command
bot.start(start);
bot.help(help);

// main command
bot.command("search", search);

bot.action(/pagination-(.+)-(.+)-(.+)-(.+)-(.+)/, pagination);

bot.action(/detail-(.+)-(.+)-(.+)-(.+)-(.+)/, detail);

bot.on("sticker", ctx => ctx.reply("👍"));
bot.hears("hi", ctx => ctx.reply("Hey there"));
bot.launch();
