declare type Theme = "light" | "dark";

export default interface DiscordWidgetInterface {
  token: string | number;
  width: string | number;
  height: string | number;
  theme: Theme;
}
