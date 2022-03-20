import BaseActivity from "./BaseActivity";
import InitActivity from "./InitActivity";
import MainActivity from "./MainActivity";
import ChangelogActivity from "./ChangelogActvity";
import PluginAboutActivity from "./plugin/PluginAboutActivity";
import SettingsActivity from "./SettingsActivity";
import EditorActivity from "./EditorActivity";
import ForbiddenActivity from "./ForbiddenActivity";
import TextFetchActivity from "./TextFetchActivity";
import LoginActivity from "./LoginActivity";
import PluginsActivity from "./plugin/PluginsActvity";

/**
 * Includes all activitys in one
 */
namespace Activity {
  /**
   * Don't use as regular activity
   */
  export const Base = BaseActivity;
  export const Init = InitActivity;
  export const Main = MainActivity;
  export const Settings = SettingsActivity;
  export const Editor = EditorActivity;
  export const TextFetch = TextFetchActivity;
  export const Changelog = ChangelogActivity;
  export const Plugins = PluginsActivity;
  export const Login = LoginActivity;
  export const Forbidden = ForbiddenActivity;
  export const PluginAbout = PluginAboutActivity;
}

export default Activity;
