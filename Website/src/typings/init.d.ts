interface PushPageProps {
  activity: JSX.Element | any;
  key: any;
  extras?: any;
  pluginAbout?: PluginAbout;
  changelog?: Changelog;
}

interface Changelog {
  version: string;
  changes: string;
  package: Package;
}

/**
 * Download links
 */
interface Package {
  /**
   * Download link for Android
   */
  android: string;
  /**
   * Download link for Windows
   */
  windows: string;
}

interface PluginAbout {
  name: string;
}

export { PushPageProps, Changelog };
