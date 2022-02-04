declare module "hmtai";
declare module "react-dom";
declare module "file-saver";
declare module "react-translated";
declare module "eruda";
declare module "image-info";
declare module "*.json" {
  const value: any;
  export default value;
}
declare module "eruda-dom";
declare module 'loader-utils' {
  export function getOptions<T>(loaderContext: { query: string }): T;
}