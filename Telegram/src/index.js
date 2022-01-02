const TelegramBot = require("node-telegram-bot-api");
const hmtai = require("./hmtai");
require("dotenv").config();

const h = hmtai;
const token = process.env.BOT_TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

bot.onText(/sfw (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];

  try {
    bot.sendPhoto(chatId, h[resp](), { caption: null });
  } catch (error) {
    console.log(error);
  }
});

bot.onText(/nsfw (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];

  try {
    bot.sendPhoto(chatId, h.nsfw[resp](), { caption: null });
  } catch (error) {
    console.log(error);
  }
});
