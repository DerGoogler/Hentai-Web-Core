import { Titlebar, Color } from "custom-electron-titlebar";

window.document.body.style.fontFamily = `system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"`;

var webview = document.createElement("iframe");
var app = document.getElementById("app");

webview.setAttribute("src", "https://dergoogler.com/hentai-web");
webview.setAttribute(
  "style",
  "display: flex; width: 100%; height: calc(100vh - 30px); border: none;"
);
app.appendChild(webview);

new Titlebar({
  backgroundColor: Color.fromHex("#403E41"),
  icon: __dirname + '/icon.png',
});
