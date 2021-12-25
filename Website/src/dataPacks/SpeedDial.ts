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
      window.open(
        // If the relase code/name is not the package version, it'll not finded
        `https://github.com/DerGoogler/Hentai-Web/releases/download/${pkg.version}/app-release.apk`,
        "_blank"
      );
    },
  },
  {
    icon: "md-github",
    onClick: () => {
      window.open("https://github.com/DerGoogler/Hentai-Web/", "_blank");
    },
  },
];

export default hot(SpeedDial);
