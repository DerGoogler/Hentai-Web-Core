import MainActivity from "./MainActivity";
import SettingsActivity from "./SettingsActivity";
import LoginActivity from "./LoginActivity";
import SplashActivity from "./SplashActivity";

const mainfest: any = {
  Main: typeof MainActivity,
  Settings: typeof SettingsActivity,
  Login: typeof LoginActivity,
  Splash: typeof SplashActivity,
};

export default mainfest;
