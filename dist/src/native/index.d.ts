import { BrowserWindowConstructorOptions } from "@Types/newWindow";
/**
 * Native calls for Windows and Android
 */
declare class native {
    private static readonly userAgentAndroid;
    private static readonly userAgentWindows;
    static readonly userAgent: string;
    static readonly isWindows: boolean;
    static readonly isAndroid: boolean;
    static readonly isInstagram: boolean;
    static readonly isFacebook: boolean;
    static readonly isIframe: boolean;
    static readonly isSmartTV: boolean;
    static readonly isConsole: boolean;
    static readonly isWearable: boolean;
    static readonly isEmbedded: boolean;
    static readonly isMobileSafari: boolean;
    static readonly isChromium: boolean;
    static readonly isMobile: boolean;
    static readonly isMobileOnly: boolean;
    static readonly isTablet: boolean;
    static readonly isBrowser: boolean;
    static readonly isDesktop: boolean;
    static readonly isWinPhone: boolean;
    static readonly isIOS: boolean;
    static readonly isChrome: boolean;
    static readonly isFirefox: boolean;
    static readonly isSafari: boolean;
    static readonly isOpera: boolean;
    static readonly isIE: boolean;
    static readonly browserVersion: string;
    static readonly browserName: string;
    static readonly mobileVendor: string;
    static readonly mobileModel: string;
    static readonly engineName: string;
    static readonly engineVersion: string;
    static readonly isEdge: boolean;
    static readonly isYandex: boolean;
    static readonly deviceType: string;
    static readonly isIOS13: boolean;
    static readonly isIPad13: boolean;
    static readonly isIPhone13: boolean;
    static readonly isIPod13: boolean;
    static readonly isElectron: boolean;
    static readonly isEdgeChromium: boolean;
    static readonly isMacOs: boolean;
    static readonly isMIUI: boolean;
    static readonly isSamsungBrowser: boolean;
    static readonly checkPlatformForBorderStyle: string;
    static navigator: Navigator;
    static location: Location;
    /**
     * Get the Android userAgent
     * @deprecated Use `native.isAndroid`
     */
    static userAgentEqualAndroid(state: boolean): boolean;
    /**
     * Get the Windows userAgent
     * @deprecated Use `native.isWindows`
     */
    static userAgentEqualWindows(state: boolean): boolean;
    static get getBuildMANUFACTURER(): string;
    static get getMODEL(): string;
    /**
     * Reloads native the app
     * @returns
     */
    static reload(): void;
    static dialog(props: {
        title: string;
        message: string;
    }): void;
    /**
     * Copy an string to clipboard on Android
     * @param content
     */
    static copyClipborad(content: string): void;
    static alert(message?: any): void;
    static confirm(message?: string | undefined): boolean;
    static prompt(message?: string | undefined, _default?: string | undefined): string | null;
    /**
     * Download an anime picture
     * @param filename
     * @param downloadUrlOfImage
     * @param id
     */
    static downloadPicture(downloadUrlOfImage: string, filename?: string, id?: any): void;
    /**
     * Set an saved key from localstorage or shared prefs
     * @param key
     * @param content
     */
    static setPref(key: string, content: string): void;
    /**
     * Get an saved key from localstorage or shared prefs
     * @param key
     * @returns
     */
    static getPref(key: string): string;
    /**
     * Shortcut functions to the cipher's object interface.
     *
     * @example
     *
     *     native.AES.encrypt(text, password);
     *     native.AES.decrypt(text, password);
     */
    static AES: {
        encrypt(text: string, password: string): string;
        decrypt(text: string, password: string): string;
    };
    /**
     * Remove an saved key from localstorage or shared prefs
     * @param key
     */
    static removePref(key: string): void;
    static readonly version: {
        readonly get: string;
        /**
         * Requires an selected version above {version}
         */
        require(version: number | undefined): boolean;
    };
    /**
     * Open an link specified by the platform
     * @param link
     * @param target
     */
    static open(link: string, target?: string): void;
    /**
     * Closes the app
     */
    static close(): void;
    /**
     * Evaluates JavaScript code and executes it.
     * @param javascriptString A String value that contains valid JavaScript code.
     */
    static eval(javascriptString: string, extras: any): void;
    /**
     * Methods that are here can only used on Windows
     */
    static readonly electron: {
        userAgentAndroid: string;
        userAgentWindows: string;
        agent: string;
        newWindow: (url: string, options: BrowserWindowConstructorOptions) => void;
        /**
         *
         * @param state
         */
        discordRPC(state: string): void;
        addEventListener(event: string, callback: Function): void;
        /**
         * Opens the devtools.
         *
         * When `contents` is a `<webview>` tag, the `mode` would be `detach` by default,
         * explicitly passing an empty `mode` can force using last used dock state.
         */
        openDevTools(): void;
        /**
         * Closes the devtools.
         */
        closeDevTools(): void;
        notification(title: string, body: string): void;
    };
    /**
     * Methods that are here can only used on Android
     */
    static readonly android: {
        userAgentAndroid: string;
        userAgentWindows: string;
        agent: string;
        setStatusbarColor(color: string): void;
        setStatusbarBackgroundWhite(): void;
        keepScreenOn(): void;
        hasBiometricEnrolled(): boolean;
        isHardwareAvailable(): boolean;
        /**
         * Check if has write permission
         * @returns {boolean}
         */
        hasStoragePermission(): boolean;
        /**
         * request permission
         */
        requestPermission(): void;
        requireSDK(sdk: number): boolean;
    };
    /**
     * The fs class enables interacting with the file system on both platforms, Windows and Android
     */
    static readonly fs: {
        userAgentAndroid: string;
        userAgentWindows: string;
        agent: string;
        readFile(path: string, options?: {
            parse: {
                use: boolean;
                mode: "json" | "yaml";
            };
        } | undefined): string | any;
        mkDir(path: string): void;
        writeFile(path: string, content: string): void;
        isFileExist(path: string): boolean;
    };
}
export default native;
