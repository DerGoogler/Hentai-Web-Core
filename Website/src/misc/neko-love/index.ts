import fetch from "node-fetch";
import { stringify } from "query-string";

interface NekoClientOptions {
  url: string;
}

interface NekoResponse {
  code: number;
  url: string;
}

/**
 * Client for Neko Love Wrapper
 */
class NekoClient {
  private baseURL: string;

  constructor(
    options: NekoClientOptions = {
      url: "https://neko-love.xyz/api",
    }
  ) {
    this.baseURL = options.url;
  }

  /**
   * Neko endpoint
   */
  neko() {
    return this.get("neko").then((body) => body.url);
  }

  /**
   * Nekolewd endpoint
   */
  nekolewd() {
    return this.get("nekolewd").then((body) => body.url);
  }

  /**
   * Kistune endpoint
   */
  kitsune() {
    return this.get("kitsune").then((body) => body.url);
  }

  /**
   * Pat endpoint
   */
  pat() {
    return this.get("pat").then((body) => body.url);
  }

  /**
   * Hug endpoint
   */
  hug() {
    return this.get("hug").then((body) => body.url);
  }

  /**
   * Waifu endpoint
   */
  waifu() {
    return this.get("waifu").then((body) => body.url);
  }

  /**
   * Cry endpoint
   */
  cry() {
    return this.get("cry").then((body) => body.url);
  }

  /**
   * Kiss endpoint
   */
  kiss() {
    return this.get("kiss").then((body) => body.url);
  }

  /**
   * Slap endpoint
   */
  slap() {
    return this.get("slap").then((body) => body.url);
  }

  /**
   * Smug endpoint
   */
  smug() {
    return this.get("smug").then((body) => body.url);
  }

  /**
   * Punch endpoint
   */
  punch() {
    return this.get("punch").then((body) => body.url);
  }

  /**
   * Burple endpoint
   */
  blurple(url: string) {
    if (!url) throw new Error(`url parameter is required for blurple endpoint.`);
    return this.get("blurple", "v2", {
      url,
    }).then((body) => body.url);
  }

  /**
   * Brightness endpoint
   */
  brightness(url: string) {
    if (!url) throw new Error(`url parameter is required for brightness endpoint.`);
    return this.get("brightness", "v2", {
      url,
    }).then((body) => body.url);
  }

  /**
   * Pixelate endpoint
   */
  pixelate(url: string) {
    if (!url) throw new Error(`url parameter is required for pixelate endpoint.`);
    return this.get("pixelate", "v2", {
      url,
    }).then((body) => body.url);
  }

  /**
   * Gotham endpoint
   */
  gotham(url: string) {
    if (!url) throw new Error(`url parameter is required for gotham endpoint.`);
    return this.get("gotham", "v2", {
      url,
    }).then((body) => body.url);
  }

  /**
   * Invert endpoint
   */
  invert(url: string) {
    if (!url) throw new Error(`url parameter is required for invert endpoint.`);
    return this.get("invert", "v2", {
      url,
    }).then((body) => body.url);
  }

  /**
   * Sepia endpoint
   */
  sepia(url: string) {
    if (!url) throw new Error(`url parameter is required for sepia endpoint.`);
    return this.get("sepia", "v2", {
      url,
    }).then((body) => body.url);
  }

  /**
   * Posterize endpoint
   */
  posterize(url: string) {
    if (!url) throw new Error(`url parameter is required for posterize endpoint.`);
    return this.get("posterize", "v2", {
      url,
    }).then((body) => body.url);
  }

  /**
   * Blur endpoint
   */
  blur(url: string) {
    if (!url) throw new Error(`url parameter is required for blur endpoint.`);
    return this.get("blur", "v2", {
      url,
    }).then((body) => body.url);
  }

  /**
   * Private method used to get endpoints with querys
   */
  async get(endpoint: string, version: string = "v1", params?: object) {
    let fetchURL = `${this.baseURL}/${version}/${endpoint}`;
    if (params) {
      fetchURL += stringify(params);
    }
    const res = await fetch(fetchURL);
    if (res.status !== 200) throw res;
    const data: NekoResponse = await res.json();
    return data;
  }
}

export default NekoClient;
