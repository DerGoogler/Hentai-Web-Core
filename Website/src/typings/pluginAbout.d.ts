interface PluginAboutTypes {
  run: string;
  package: Package;
}

interface Package {
  author: string;
  version: number;
  language: string;
  description: string;
}

export { PluginAboutTypes };
