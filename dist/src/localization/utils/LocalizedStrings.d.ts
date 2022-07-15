export default LocalizedStrings;
declare class LocalizedStrings {
    /**
     * Constructor used to provide the strings objects in various language and the optional callback to get
     * the interface language
     * @param {*} props - the strings object
     * @param {Function} options.customLanguageInterface - the optional method to use to get the InterfaceLanguage
     * @param {Boolean} options.pseudo - convert all strings to pseudo, helpful when implementing
     * @param {Boolean} options.pseudoMultipleLanguages - add 40% to pseudo, helps with translations in the future
     * @param {Boolean} options.logsEnabled - Enable/Disable console.log outputs (default=true)
     */
    constructor(props: any, options: any);
    _opts: any;
    _interfaceLanguage: any;
    _language: any;
    /**
     * Set the strings objects based on the parameter passed in the constructor
     * @param {*} props
     */
    setContent(props: any): void;
    _defaultLanguage: string | undefined;
    _defaultLanguageFirstLevelKeys: any[] | undefined;
    _props: any;
    /**
     * Replace all strings to pseudo value
     * @param {Object} obj - Loopable object
     */
    _pseudoAllValues(obj: Object): void;
    /**
     * Can be used from ouside the class to force a particular language
     * indipendently from the interface one
     * @param {*} language
     */
    setLanguage(language: any): void;
    /**
     * Load fallback values for missing translations
     * @param {*} defaultStrings
     * @param {*} strings
     */
    _fallbackValues(defaultStrings: any, strings: any): void;
    /**
     * The current language displayed (could differ from the interface language
     * if it has been forced manually and a matching translation has been found)
     */
    getLanguage(): any;
    /**
     * The current interface language (could differ from the language displayed)
     */
    getInterfaceLanguage(): any;
    /**
     * Return an array containing the available languages passed as props in the constructor
     */
    getAvailableLanguages(): any[];
    _availableLanguages: any[] | undefined;
    formatString(str: any, ...valuesForPlaceholders: any[]): any;
    getString(key: any, language: any, omitWarning?: boolean): any;
    /**
     * The current props (locale object)
     */
    getContent(): any;
}
