const Command = require("../Command.js");
const { MessageEmbed } = require("discord.js");
const { oneLine } = require("common-tags");

module.exports = class GitHubCommand extends Command {
  constructor(client) {
    super(client, {
      name: "github",
      aliases: ["gh", "repo"],
      usage: "github",
      description: "Displays the link to HentaiWeb's GitHub repository.",
      type: client.types.INFO,
    });
  }
  run(message) {
    const embed = new MessageEmbed()
      .setTitle("GitHub Link")
      .setThumbnail(
        "https://github.com/DerGoogler/Hentai-Web/raw/master/Desktop/build/ic_launcher.png"
      )
      .setDescription(
        oneLine`
        Click [here](https://github.com/DerGoogler/Hentai-Web/tree/master/Discord) to to visit my GitHub repository!
        Please support me by starring ⭐ the repo, and feel free to comment about issues or suggestions!
      `
      )
      .addField(
        "Other Links",
        "**[Invite Me](https://discordapp.com/oauth2/authorize?client_id=726837711851356242&scope=bot&permissions=403008599)**"
      )
      .setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
  }
};
