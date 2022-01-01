// Load up the discord.js library
const { Client, Intents } = require("discord.js");
const data = require("./data");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

const config = {
  prefix: "hw.",
};

client.on("ready", () => {
  console.log(
    `Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`
  );
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("guildCreate", (guild) => {
  console.log(
    `New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`
  );
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("guildDelete", (guild) => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("message", async (message) => {
  if (message.author.bot) return false;

  if (message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === "ping") {
    const m = await message.channel.send("Ping?");
    m.edit(
      `Pong! Latency is ${
        m.createdTimestamp - message.createdTimestamp
      }ms. API Latency is ${Math.round(client.ping)}ms`
    );
  }

  if (command === "say") {
    const sayMessage = args.join(" ");
    message.delete().catch((O_o) => {});
    message.channel.send(sayMessage);
  }

  if (command === "hm") {
    const hentaiImage = args.join(" ");
    try {
      if (message.channel.nsfw) {
        message.delete().catch((O_o) => {});
        message.channel.send(`${data[hentaiImage]}`);
      } else {
        message.delete().catch((O_o) => {});
        message.channel.send("This channel is is not as NSFW marked.");
      }
    } catch (error) {
      message.delete().catch((O_o) => {});
      console.log(error);
    }
  }

  if (command === "purge") {
    const deleteCount = parseInt(args[0], 10);

    if (!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply(
        "Please provide a number between 2 and 100 for the number of messages to delete"
      );

    const fetched = await message.channel.fetchMessages({ count: deleteCount });
    message.channel
      .bulkDelete(fetched)
      .catch((error) =>
        message.reply(`Couldn't delete messages because of: ${error}`)
      );
  }
});

client.login(process.env.BOT_TOKEN);
