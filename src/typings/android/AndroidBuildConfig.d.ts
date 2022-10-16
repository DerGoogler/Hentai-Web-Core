export {};

declare global {
  interface AndroidBuildConfig {
    DEBUG(): boolean;
    APPLICATION_ID(): string;
    BUILD_TYPE(): string;
    VERSION_CODE(): number;
    VERSION_NAME(): string;
  }
}
