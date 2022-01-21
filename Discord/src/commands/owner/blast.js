const Command = require("../Command.js");
const { MessageEmbed } = require("discord.js");

module.exports = class BlastCommand extends Command {
  constructor(client) {
    super(client, {
      name: "blast",
      usage: "blast <message>",
      description:
        "Sends a message to every server that HentaiWeb is in that has a system channel.",
      type: client.types.OWNER,
      ownerOnly: true,
      examples: ["blast Hello World!"],
    });
  }
  run(message, args) {
    if (!args[0]) return this.sendErrorMessage(message, 0, "Please provide a message to blast");
    const msg = message.content.slice(message.content.indexOf(args[0]), message.content.length);
    const guilds = [];
    message.client.guilds.cache.forEach((guild) => {
      const systemChannelId = message.client.db.settings.selectSystemChannelId
        .pluck()
        .get(guild.id);
      const systemChannel = guild.channels.cache.get(systemChannelId);
      if (
        systemChannel &&
        systemChannel.viewable &&
        systemChannel.permissionsFor(guild.me).has(["SEND_MESSAGES", "EMBED_LINKS"])
      ) {
        const embed = new MessageEmbed()
          .setTitle("HentaiWeb System Message")
          .setThumbnail(
            "https://github.com/DerGoogler/Hentai-Web/raw/master/Desktop/build/ic_launcher.png"
          )
          .setDescription(msg)
          .setTimestamp()
          .setColor(message.guild.me.displayHexColor);
        systemChannel.send(embed);
      } else guilds.push(guild.name);
    });

    if (guilds.length > 0) {
      // Trim array
      const description = message.client.utils.trimStringFromArray(guilds);

      const embed = new MessageEmbed()
        .setTitle("Blast Failures")
        .setDescription(description)
        .setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor(message.guild.me.displayHexColor);
      message.channel.send(embed);
    }
  }
};
