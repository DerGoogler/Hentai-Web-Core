const Command = require("../Command.js");
const { MessageEmbed } = require("discord.js");
const { success } = require("../../utils/emojis.json");

module.exports = class JoinChannelCommand extends Command {
  constructor(client) {
    super(client, {
      name: "joinchannel",
      usage: "joinchannel",
      type: client.types.ADMIN,
      examples: ["joinchannel"],
    });
  }
  run(message) {
    const { voice } = message.member;

    if (!voice.channelID) {
      message.reply("You must be in a voice channel");
      return;
    }

    voice.channel.join();
  }
};
