const Command = require("../Command.js");
const { MessageEmbed } = require("discord.js");

module.exports = class PrefixCommand extends Command {
  constructor(client) {
    super(client, {
      name: "prefix",
      aliases: ["pre"],
      usage: "prefix",
      description: "Fetches HentaiWeb's current prefix.",
      type: client.types.INFO,
    });
  }
  run(message) {
    const prefix = message.client.db.settings.selectPrefix.pluck().get(message.guild.id); // Get prefix
    const embed = new MessageEmbed()
      .setTitle("HentaiWeb's Prefix")
      .setThumbnail(
        "https://github.com/DerGoogler/Hentai-Web/raw/master/Desktop/build/ic_launcher.png"
      )
      .addField("Prefix", `\`${prefix}\``, true)
      .addField("Example", `\`${prefix}ping\``, true)
      .setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
  }
};
