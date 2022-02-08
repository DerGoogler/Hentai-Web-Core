import native from "@Native/index";
import axios from "axios";

const files = [
  "wallpaper",
  "mobilewallpaper",
  "sfwneko",
  "jahy",
  "slap",
  "lick",
  "depression",
  "christmas",
  "legs",
  "trashgangartclub",
  "profilepicture",
  "ass",
  "bdsm",
  "cum",
  "creampie",
  "manga",
  "femdom",
  "hentai",
  "incest",
  "ero",
  "orgy",
  "elves",
  "panties",
  "cuckold",
  "blowjob",
  "boobjob",
  "foot",
  "pussy",
  "ahegao",
  "uniform",
  "gangbang",
  "hnt_gifs",
  "nsfwneko",
  "glasses",
  "tentacles",
  "thighs",
  "yuri",
  "zettairyouiki",
  "masturbation",
  "public",
  "nsfwmobilewallpaper",
  "nsfwchristmas",
];

function randomizer(image: string): string {
  native.fs.mkDir("images");
  try {
    if (native.isAndroid || native.isWindows) {
      axios.get("https://cdn.dergoogler.com/others/hentai-web/images/" + image + ".json").then((res) => {
        try {
          const data = res.data;
          native.fs.writeFile("images/" + image + ".json", JSON.stringify(data));
        } catch (error) {
          console.log(error);
        }
      });
    } else {
      axios.get("https://cdn.dergoogler.com/others/hentai-web/images/" + image + ".json").then((res) => {
        try {
          const data = res.data;
          native.setPref(image + ".json", JSON.stringify(data));
        } catch (error) {
          console.log(error);
        }
      });
    }
    const data =
      native.isAndroid || native.isWindows
        ? native.fs.readFile("images/" + image + ".json", { parse: { use: true, mode: "json" } })
        : // @ts-ignore
          JSON.parse(native.getPref(image + ".json"));
    return data[Math.floor(Math.random() * data.length)];
  } catch (error) {
    return "error";
  }
}

class hmtai {
  public static wallpaper() {
    // Returns you SFW Anime Wallpapers for Desktops ! //
    return randomizer("wallpaper");
  }
  public static mobileWallpaper() {
    // Returns SFW Anime Wallpapers for Mobile Users ! //
    return randomizer("mobilewallpaper");
  }
  public static neko() {
    // Returns Safe for Work Neko Images! //
    return randomizer("sfwneko");
  }
  public static jahy() {
    // Returns Safe for Work Jahy Images! //
    return randomizer("jahy");
  }
  public static slap() {
    // Returns Safe for Work Slap Gifs! //
    return randomizer("slap");
  }
  public static lick() {
    // Returns Safe for Work lick Gifs! //
    return randomizer("lick");
  }
  public static depression() {
    // Returns Safe for Work Depression Gifs! //
    return randomizer("depression");
  }
  public static christmas() {
    // Returns Safe for Work Christmas Images! //
    return randomizer("christmas");
  }
  public static legs() {
    // Returns Safe for Work Leg Images! //
    return randomizer("legs");
  }
  /**
   * Images for TEASH GANG Art Club
   */
  public static tgac() {
    return randomizer("trashgangartclub");
  }
  /**
   * Images for Profile Pictures
   */
  public static profilePicture() {
    return randomizer("profilepicture");
  }

  public static nsfw = {
    // Returns a NSFW category //
    ass() {
      // Returns you ass Images ! //
      return randomizer("ass");
    },
    bdsm() {
      // Returns you lewd ... and dirty ... BDSM Images ! //
      return randomizer("bdsm");
    },
    cum() {
      // Returns you cumshot and creampies Images ! //
      return randomizer("cum");
    },
    creampie() {
      // Returns a dirty creampie Images ! //
      return randomizer("creampie");
    },
    manga() {
      // Returns you Hentai-Manga Images ! //
      return randomizer("manga");
    },
    femdom() {
      // Returns how Womans fucked Mans ! ///
      return randomizer("femdom");
    },
    hentai() {
      // Returns you simple Hentai Images ! //
      return randomizer("hentai");
    },
    incest() {
      // Returns you incest Images ! //
      return randomizer("incest");
    },
    ero() {
      // Returns you Erotic(ecchi) Images ! //
      return randomizer("ero");
    },
    orgy() {
      // Returns you lewd ... and dirty ... Orgy Images ! //
      return randomizer("orgy");
    },
    elves() {
      // Returns lewd ... and dirty ... Elves Images ! //
      return randomizer("elves");
    },
    pantsu() {
      // Returns you panties Images ! //
      return randomizer("panties");
    },
    cuckold() {
      // Return you a cuckold's moment ! //
      return randomizer("cuckold");
    },
    blowjob() {
      // Returns you blowjobs Images ! //
      return randomizer("blowjob");
    },
    boobjob() {
      // Returns you boobjob Images ! //
      return randomizer("boobjob");
    },
    foot() {
      // Returns you lewd ... and dirty ... FootFetish Images ! //
      return randomizer("foot");
    },
    vagina() {
      // Returns you lewd ... and dirty ... Pussy Images ! //
      return randomizer("pussy");
    },
    ahegao() {
      // Returns you lewd ... and dirty ... Ahegao Images ! //
      return randomizer("ahegao");
    },
    uniform() {
      // Returns you NSFW Images with uniform ! //
      return randomizer("uniform");
    },
    gangbang() {
      // Returns you lewd ... and dirty ... GangBang Images ! //
      return randomizer("gangbang");
    },
    gif() {
      // Returns Hentai Gifs ! //
      return randomizer("hnt_gifs");
    },
    nsfwNeko() {
      // Returns you lewd ... and dirty ... Neko Images ! //
      return randomizer("nsfwneko");
    },
    glasses() {
      // Returns you lewd ... and dirty ... Anime Girls with Glasses Images ! //
      return randomizer("glasses");
    },
    tentacles() {
      // Returns you lewd ... and dirty ... Tentacles Hentai Images ! //
      return randomizer("tentacles");
    },
    thighs() {
      // Returns you sweet Thighs Images ! //
      return randomizer("thighs");
    },
    yuri() {
      // Returns you lewd ... two girls Images ! //
      return randomizer("yuri");
    },
    zettaiRyouiki() {
      // Returns you beatifull <3 ZettaiRyouiki Images ! //
      return randomizer("zettairyouiki");
    },
    masturbation() {
      // Returns you lewd masturbation Images ! //
      return randomizer("masturbation");
    },
    public() {
      // Returns you hentai on a Public Images ! //
      return randomizer("public");
    },
    nsfwMobileWallpaper() {
      // Returns SFW Anime Wallpapers for Mobile Users ! //
      return randomizer("nsfwmobilewallpaper");
    },
    nsfwChristmas() {
      // Returns SFW Anime Wallpapers for Mobile Users ! //
      return randomizer("nsfwchristmas");
    },
  };
}

export default hmtai;
