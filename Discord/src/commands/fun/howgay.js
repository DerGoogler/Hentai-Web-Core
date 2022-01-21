const Command = require("../Command.js");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = class HowGayCommand extends Command {
  constructor(client) {
    super(client, {
      name: "howgay",
      aliases: ["hg"],
      usage: "howgay",
      description: "Check how gay are you",
      type: client.types.FUN,
    });
  }
  async run(message, args) {
    try {
      let random = Math.floor(Math.random() * 101);
      message.channel.send(`You're **${random}%** gay!`);
    } catch (err) {
      message.client.logger.error(err.stack);
      this.sendErrorMessage(message, 1, "Please try again in a few seconds", err.message);
    }
  }
};
