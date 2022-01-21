const Command = require("../Command.js");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports = class UptimeCommand extends Command {
  constructor(client) {
    super(client, {
      name: "uptime",
      aliases: ["up"],
      usage: "uptime",
      description: "Fetches HentaiWeb's current uptime.",
      type: client.types.INFO,
    });
  }
  run(message) {
    const d = moment.duration(message.client.uptime);
    const days = d.days() == 1 ? `${d.days()} day` : `${d.days()} days`;
    const hours = d.hours() == 1 ? `${d.hours()} hour` : `${d.hours()} hours`;
    const minutes = d.minutes() == 1 ? `${d.minutes()} minute` : `${d.minutes()} minutes`;
    const seconds = d.seconds() == 1 ? `${d.seconds()} second` : `${d.seconds()} seconds`;
    const date = moment().subtract(d, "ms").format("dddd, MMMM Do YYYY");
    const embed = new MessageEmbed()
      .setTitle("HentaiWeb's Uptime")
      .setThumbnail(
        "https://github.com/DerGoogler/Hentai-Web/raw/master/Desktop/build/ic_launcher.png"
      )
      .setDescription(`\`\`\`prolog\n${days}, ${hours}, ${minutes}, and ${seconds}\`\`\``)
      .addField("Date Launched", date)
      .setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
  }
};
