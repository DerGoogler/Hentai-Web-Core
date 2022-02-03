const Command = require("../Command.js");

module.exports = class JoinChannelCommand extends Command {
  constructor(client) {
    super(client, {
      name: "joinvoice",
      usage: "joinvoice",
      type: client.types.ADMIN,
      userPermissions: ["ADMINISTRATOR"],
      examples: ["joinvocie"],
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
