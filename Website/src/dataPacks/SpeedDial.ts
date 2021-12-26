import { hot } from "react-hot-loader/root";
import { android } from "../misc/android";
import pkg from "../../package.json";

const SpeedDial = [
  {
    icon: "md-refresh",
    onClick: () => {
      android.reload();
    },
  },
  {
    id: "download-app",
    icon: "md-download",
    onClick: () => {
      android.open(
        // If the relase code/name is not the package version, it'll not finded
        `https://github.com/DerGoogler/Hentai-Web/releases/download/${pkg.version}/app-release.apk`
      );
    },
  },
  {
    icon: "md-github",
    onClick: () => {
      android.open("https://github.com/DerGoogler/Hentai-Web/");
    },
  },
];

export default hot(SpeedDial);
