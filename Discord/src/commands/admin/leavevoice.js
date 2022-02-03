const Command = require("../Command.js");

module.exports = class JoinChannelCommand extends Command {
  constructor(client) {
    super(client, {
      name: "leavevoice",
      usage: "leavevoice",
      type: client.types.ADMIN,
      userPermissions: ["ADMINISTRATOR"],
      examples: ["leavevoice"],
    });
  }
  run(message) {
    const { voice } = message.member;

    if (!voice.channelID) {
      message.reply("You must be in a voice channel");
      return;
    }

    voice.channel.leave();
  }
};
