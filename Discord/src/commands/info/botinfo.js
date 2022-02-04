const Command = require("../Command.js");
const { MessageEmbed } = require("discord.js");
const pkg = require(__basedir + "/package.json");
const { owner } = require("../../utils/emojis.json");
const { oneLine, stripIndent } = require("common-tags");

module.exports = class BotInfoCommand extends Command {
  constructor(client) {
    super(client, {
      name: "botinfo",
      aliases: ["bot", "bi"],
      usage: "botinfo",
      description: "Fetches HentaiWeb's bot information.",
      type: client.types.INFO,
    });
  }
  run(message) {
    const botOwner = message.client.users.cache.get(message.client.ownerId);
    const prefix = message.client.db.settings.selectPrefix.pluck().get(message.guild.id);
    const tech = stripIndent`
      Version     :: ${pkg.version}
      Library     :: Discord.js v12.3.1
      Environment :: Node.js v16.13.2
      Database    :: SQLite
    `;
    const embed = new MessageEmbed()
      .setTitle("HentaiWeb's Bot Information")
      .addField("Prefix", `\`${prefix}\``, true)
      .addField("Client ID", `\`${message.client.user.id}\``, true)
      .addField(`Developer ${owner}`, botOwner, true)
      .addField("Tech", `\`\`\`asciidoc\n${tech}\`\`\``)
      .addField(
        "**Links**",
        "**[Invite Me](https://discordapp.com/oauth2/authorize?client_id=726837711851356242&scope=bot&permissions=403008599) | " +
          "[Repository](https://github.com/DerGoogler/Hentai-Web/tree/master/Discord)**"
      )
      .setImage(
        "https://raw.githubusercontent.com/sabattle/HentaiWebBot/develop/data/images/HentaiWeb_Title.png"
      )
      .setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
  }
};
