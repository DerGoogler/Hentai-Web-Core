declare module "hmtai";
declare module "react-dom";
declare module "file-saver";
declare module "react-translated";
declare module "eruda";
declare module "safer-eval";
declare module "image-info";
declare module 'browserify-fs';
declare module 'vm-browserify';
declare module "*.json" {
  const value: any;
  export default value;
}
declare module "*.yaml" {
  const value: any;
  export default value;
}
declare module "eruda-dom";
declare module "loader-utils" {
  export function getOptions<T>(loaderContext: { query: string }): T;
}
