import native from "@Native/index";
import axios from "axios";


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
  public static sfw = {
    get(image: string): string {
      return randomizer(image);
    },
  };
  public static nsfw = {
    get(image: string): string {
      return randomizer(image);
    },
  };
}

export default hmtai;
