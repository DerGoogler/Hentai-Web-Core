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
declare namespace Activity {
    const Base: typeof BaseActivity;
    const Init: typeof InitActivity;
    const Main: typeof MainActivity;
    const Settings: typeof SettingsActivity;
    const Editor: typeof EditorActivity;
    const TextFetch: typeof TextFetchActivity;
    const Changelog: typeof ChangelogActivity;
    const Plugins: typeof PluginsActivity;
    const Login: typeof LoginActivity;
    const Forbidden: typeof ForbiddenActivity;
    const PluginAbout: typeof PluginAboutActivity;
}
export default Activity;
