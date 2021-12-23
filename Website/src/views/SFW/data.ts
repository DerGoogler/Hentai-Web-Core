import { hot } from "react-hot-loader/root";
import hmtai from "../../misc/hmtai";

const data = [
  {
    name: "wallpaper",
    source: hmtai.wallpaper(),
  },
  {
    name: "mobile Wallpaper",
    source: hmtai.mobileWallpaper(),
  },
  {
    name: "neko",
    source: hmtai.neko(),
  },
  {
    name: "jahy",
    source: hmtai.jahy(),
  },
  {
    name: "lick",
    source: hmtai.lick(),
  },
  {
    name: "slap",
    source: hmtai.slap(),
  },
  {
    name: "depression",
    source: hmtai.depression(),
  },
];

export default hot(data);
