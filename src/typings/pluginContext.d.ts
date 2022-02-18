import tools from "@Misc/tools";
import HWPlugin from "@Native/hwplugin";
import native from "@Native/index";
import ons from "onsenui";

interface PluginContext {
  readonly native: typeof native;
  readonly HWPlugin: typeof HWPlugin;
  readonly tools: typeof tools;
  readonly ons: typeof ons;
  readonly __dirname: string;
  readonly window: Window;
  readonly Android: undefined;
  readonly Windows: undefined;
  readonly eval: undefined;
  readonly document: typeof document;
  require(path: any): void;
  readonly console: Console;
}

interface Console {
  /**
   * Prints to `stderr` with newline. Multiple arguments can be passed, with the
   * first used as the primary message and all additional used as substitution
   * values similar to [`printf(3)`](http://man7.org/linux/man-pages/man3/printf.3.html) (the arguments are all passed to `util.format()`).
   *
   * ```js
   * const code = 5;
   * console.error('error #%d', code);
   * // Prints: error #5, to stderr
   * console.error('error', code);
   * // Prints: error 5, to stderr
   * ```
   *
   * If formatting elements (e.g. `%d`) are not found in the first string then `util.inspect()` is called on each argument and the resulting string
   * values are concatenated. See `util.format()` for more information.
   * @since v0.1.100
   */
  error(message?: any, ...optionalParams: any[]): void;
  /**
   * The `console.info()` function is an alias for {@link log}.
   * @since v0.1.100
   */
  info(message?: any, ...optionalParams: any[]): void;
  /**
   * Prints to `stdout` with newline. Multiple arguments can be passed, with the
   * first used as the primary message and all additional used as substitution
   * values similar to [`printf(3)`](http://man7.org/linux/man-pages/man3/printf.3.html) (the arguments are all passed to `util.format()`).
   *
   * ```js
   * const count = 5;
   * console.log('count: %d', count);
   * // Prints: count: 5, to stdout
   * console.log('count:', count);
   * // Prints: count: 5, to stdout
   * ```
   *
   * See `util.format()` for more information.
   * @since v0.1.100
   */
  log(message?: any, ...optionalParams: any[]): void;
  /**
   * The `console.warn()` function is an alias for {@link error}.
   * @since v0.1.100
   */
  warn(message?: any, ...optionalParams: any[]): void;
}

interface Window {
  readonly Android: undefined;
  readonly Windows: undefined;
}

export default PluginContext;
