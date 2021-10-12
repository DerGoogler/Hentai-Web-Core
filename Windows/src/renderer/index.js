import { Titlebar, Color } from "custom-electron-titlebar";

window.addEventListener("DOMContentLoaded", () => {
  new Titlebar({
    backgroundColor: Color.fromHex("#403E41"),
  }).updateTitle("Hentai Web Desktop");
});
