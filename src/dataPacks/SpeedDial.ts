import native from "@Native/index";
import pkg from "../../package.json";

const SpeedDial = [
  {
    icon: "md-refresh",
    onClick: () => {
      native.reload();
    },
  },

  {
    icon: "md-github",
    onClick: () => {
      native.open("https://github.com/DerGoogler/Hentai-Web/");
    },
  },
  {
    id: "download-app",
    icon: "md-download",
    onClick: () => {
      native.open(
        // If the relase code/name is not the package version, it'll not finded
        `https://github.com/DerGoogler/Hentai-Web/releases/download/${pkg.version}/app-release.apk`
      );
    },
  },
];

export default SpeedDial;
