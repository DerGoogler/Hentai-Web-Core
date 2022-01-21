const Command = require("../Command.js");
const { MessageEmbed } = require("discord.js");
const { oneLine } = require("common-tags");

module.exports = class InviteMeCommand extends Command {
  constructor(client) {
    super(client, {
      name: "inviteme",
      aliases: ["invite", "invme", "im"],
      usage: "inviteme",
      description: "Generates a link you can use to invite HentaiWeb to your own server.",
      type: client.types.INFO,
    });
  }
  run(message) {
    const embed = new MessageEmbed()
      .setTitle("Invite Me")
      .setThumbnail(
        "https://github.com/DerGoogler/Hentai-Web/raw/master/Desktop/build/ic_launcher.png"
      )
      .setDescription(
        oneLine`
        Click [here](https://discordapp.com/oauth2/authorize?client_id=726837711851356242&scope=bot&permissions=403008599)
        to invite me to your server!
      `
      )
      .addField(
        "Other Links",
        "**[Repository](https://github.com/DerGoogler/Hentai-Web/tree/master/Discord)**"
      )
      .setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
  }
};
