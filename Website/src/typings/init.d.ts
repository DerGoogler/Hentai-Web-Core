interface PushPageProps {
  activity: JSX.Element;
  key: any;
  pluginAbout?: PluginAbout;
  changelog?: Changelog;
}

interface Changelog {
  version: string;
  changes: string;
  package: Package;
}

interface Package {
  android: string;
  windows: string;
}

interface PluginAbout {
  name: string;
}

export { PushPageProps, Changelog };
