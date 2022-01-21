const Command = require("../Command.js");
const hmtai = require("./../../utils/hmtai/index");

module.exports = class HmtaiCommand extends Command {
  constructor(client) {
    super(client, {
      name: "hm",
      usage: "hm <type> <category>",
      description: "Sends random Hentai image",
      type: client.types.FUN,
      examples: ["hm sfw neko", "hm nsfw ass", "hm commands"],
    });
  }
  async run(message, args) {
    try {
      switch (args[0]) {
        case "sfw":
          message.channel.send(`${hmtai[args[1]]()}`);
          break;
        case "nsfw":
          message.channel.nsfw
            ? message.channel.send(`${hmtai.nsfw[args[1]]()}`)
            : message.channel.send(`This is not an NSFW channel`);
          break;
        case "commands":
          message.channel.send(
            `
                  **All commands**
          
                  SFW:
                  - wallpaper
                  - mobileWallpaper
                  - neko
                  - jahy
                  - slap
                  - lick
                  - depression
                  - christmas
                  - legs
          
                  NSFW:
                  - ass
                  - bdsm
                  - cum
                  - creampie
                  - manga
                  - femdom
                  - hentai
                  - incest
                  - ero
                  - orgy
                  - elves
                  - pantsu
                  - cuckold
                  - blowjob
                  - boobjob
                  - foot
                  - vagina
                  - ahegao
                  - uniform
                  - gangbang
                  - gif
                  - nsfwNeko
                  - glasses
                  - tentacles
                  - thighs
                  - yuri
                  - zettaiRyouiki
                  - nsfwChristmas
                  - nsfwMobileWallpaper
                  - publicmasturbation
                  `
          );
          break;
      }
    } catch (err) {
      message.client.logger.error(err.stack);
      this.sendErrorMessage(message, 1, "Please try again in a few seconds", err.message);
    }
  }
};
