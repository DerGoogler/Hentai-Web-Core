require("dotenv").config();
const { Client, Intents } = require("discord.js");
const hmtai = require("./hmtai");

const h = hmtai;
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const config = {
  prefix: "hw.",
};

client.on("ready", () => {
  console.log(
    `Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`
  );
  client.user.setActivity("DerGoogler/Hentai-Web");
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

  if (command === "sfw") {
    const hentaiImage = args.join(" ");
    try {
      message.delete().catch((O_o) => {});
      message.channel.send(`${h[hentaiImage]()}`);
    } catch (error) {
      message.delete().catch((O_o) => {});
      message.channel.send(`Command not found!`);
      console.log(error);
    }
  }

  if (command === "nsfw") {
    const hentaiImage = args.join(" ");
    if (message.channel.nsfw) {
      try {
        message.delete().catch((O_o) => {});
        message.channel.send(`${h.nsfw[hentaiImage]()}`);
      } catch (error) {
        message.delete().catch((O_o) => {});
        message.channel.send(`Command not found!`);
        console.log(error);
      }
    } else {
      message.delete().catch((O_o) => {});
      message.channel.send("This channel is is not as NSFW marked.");
    }
  }
});

client.login(process.env.BOT_TOKEN);
