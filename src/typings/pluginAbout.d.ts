interface PluginAboutTypes {
  run: string;
  package: Package;
}

interface Package {
  author: string;
  version: string;
  language: string;
  description: string;
}

export { PluginAboutTypes };
