function getInterfaceLanguage() {
  const defaultLang = "en-US";
  if (typeof navigator === "undefined") {
    return defaultLang;
  }
  const nav = navigator; // eslint-disable-line no-undef
  if (nav) {
    if (nav.language) {
      return nav.language;
    }
    if (!!nav.languages && !!nav.languages[0]) {
      return nav.languages[0];
    }
    if (nav.userLanguage) {
      return nav.userLanguage;
    }
    if (nav.browserLanguage) {
      return nav.browserLanguage;
    }
  }
  return defaultLang;
}

/**
 * Get the best match based on the language passed and the available languages
 * @param {*} language
 * @param {*} props
 */
function getBestMatchingLanguage(language, props) {
  // If an object with the passed language key exists return it
  if (props[language]) return language;

  // if the string is composed try to find a match with only the first language identifiers (en-US --> en)
  const idx = language.indexOf("-");
  const auxLang = idx >= 0 ? language.substring(0, idx) : language;
  return props[auxLang] ? auxLang : Object.keys(props)[0];
}

/**
 * Check that the keys used in the provided strings object don't collide with existing property
 * already defined in the LocalizedStrings object
 * @param {*} translationKeys
 */
function validateTranslationKeys(translationKeys) {
  const reservedNames = [
    "_interfaceLanguage",
    "_language",
    "_defaultLanguage",
    "_defaultLanguageFirstLevelKeys",
    "_props",
  ];
  translationKeys.forEach((key) => {
    if (reservedNames.indexOf(key) !== -1) {
      throw new Error(`${key} cannot be used as a key. It is a reserved word.`);
    }
  });
}

/**
 * Get a random pseudo string back after specified a length
 * @param {Number} len - How many characters to get back
 */
function randomPseudo(len) {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < len; i += 1) text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

const placeholderReplaceRegex = /(\{[\d|\w]+\})/;
const placeholderReferenceRegex = /(\$ref\{[\w|.]+\})/;

class LocalizedStrings {
  /**
   * Constructor used to provide the strings objects in various language and the optional callback to get
   * the interface language
   * @param {*} props - the strings object
   * @param {Function} options.customLanguageInterface - the optional method to use to get the InterfaceLanguage
   * @param {Boolean} options.pseudo - convert all strings to pseudo, helpful when implementing
   * @param {Boolean} options.pseudoMultipleLanguages - add 40% to pseudo, helps with translations in the future
   * @param {Boolean} options.logsEnabled - Enable/Disable console.log outputs (default=true)
   */
  constructor(props, options) {
    // Compatibility fix with previous version
    if (typeof options === "function") {
      /* eslint-disable no-param-reassign */
      options = { customLanguageInterface: options };
      /* eslint-enable */
    }
    this._opts = Object.assign(
      {},
      {
        customLanguageInterface: getInterfaceLanguage,
        pseudo: false,
        pseudoMultipleLanguages: false,
        logsEnabled: true,
      },
      options
    );
    this._interfaceLanguage = this._opts.customLanguageInterface();
    this._language = this._interfaceLanguage;
    this.setContent(props);
  }

  /**
   * Set the strings objects based on the parameter passed in the constructor
   * @param {*} props
   */
  setContent(props) {
    const [defaultLang] = Object.keys(props);
    this._defaultLanguage = defaultLang;
    this._defaultLanguageFirstLevelKeys = [];
    // Store locally the passed strings
    this._props = props;
    validateTranslationKeys(Object.keys(props[this._defaultLanguage]));
    // Store first level keys (for identifying missing translations)
    Object.keys(this._props[this._defaultLanguage]).forEach((key) => {
      if (typeof this._props[this._defaultLanguage][key] === "string") {
        this._defaultLanguageFirstLevelKeys.push(key);
      }
    });
    // Set language to its default value (the interface)
    this.setLanguage(this._interfaceLanguage);
    // Developermode with pseudo
    if (this._opts.pseudo) {
      this._pseudoAllValues(this._props);
    }
  }

  /**
   * Replace all strings to pseudo value
   * @param {Object} obj - Loopable object
   */
  _pseudoAllValues(obj) {
    Object.keys(obj).forEach((property) => {
      if (typeof obj[property] === "object") {
        this._pseudoAllValues(obj[property]);
      } else if (typeof obj[property] === "string") {
        if (obj[property].indexOf("[") === 0 && obj[property].lastIndexOf("]") === obj[property].length - 1) {
          // already psuedo fixed
          return;
        }
        // @TODO must be a way to get regex to find all replaceble strings except our replacement variables
        const strArr = obj[property].split(" ");
        for (let i = 0; i < strArr.length; i += 1) {
          if (strArr[i].match(placeholderReplaceRegex)) {
            // we want to keep this string, includes specials
          } else if (strArr[i].match(placeholderReferenceRegex)) {
            // we want to keep this string, includes specials
          } else {
            let len = strArr[i].length;
            if (this._opts.pseudoMultipleLanguages) {
              len = parseInt(len * 1.4, 10); // add length with 40%
            }
            strArr[i] = randomPseudo(len);
          }
        }
        obj[property] = `[${strArr.join(" ")}]`; // eslint-disable-line no-param-reassign
      }
    });
  }

  /**
   * Can be used from ouside the class to force a particular language
   * indipendently from the interface one
   * @param {*} language
   */
  setLanguage(language) {
    // Check if exists a translation for the current language or if the default
    // should be used
    const bestLanguage = getBestMatchingLanguage(language, this._props);
    const defaultLanguage = Object.keys(this._props)[0];
    this._language = bestLanguage;
    // Associate the language object to the this object
    if (this._props[bestLanguage]) {
      // delete default propery values to identify missing translations
      for (let i = 0; i < this._defaultLanguageFirstLevelKeys.length; i += 1) {
        delete this[this._defaultLanguageFirstLevelKeys[i]];
      }
      let localizedStrings = Object.assign({}, this._props[this._language]);
      Object.keys(localizedStrings).forEach((key) => {
        this[key] = localizedStrings[key];
      });
      // Now add any string missing from the translation but existing in the default language
      if (defaultLanguage !== this._language) {
        localizedStrings = this._props[defaultLanguage];
        this._fallbackValues(localizedStrings, this);
      }
    }
  }

  /**
   * Load fallback values for missing translations
   * @param {*} defaultStrings
   * @param {*} strings
   */
  _fallbackValues(defaultStrings, strings) {
    Object.keys(defaultStrings).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(defaultStrings, key) && !strings[key] && strings[key] !== "") {
        strings[key] = defaultStrings[key]; // eslint-disable-line no-param-reassign
        if (this._opts.logsEnabled) {
          console.log(`🚧 👷 key '${key}' not found in localizedStrings for language ${this._language} 🚧`);
        }
      } else if (typeof strings[key] !== "string") {
        // It's an object
        this._fallbackValues(defaultStrings[key], strings[key]);
      }
    });
  }

  /**
   * The current language displayed (could differ from the interface language
   * if it has been forced manually and a matching translation has been found)
   */
  getLanguage() {
    return this._language;
  }

  /**
   * The current interface language (could differ from the language displayed)
   */
  getInterfaceLanguage() {
    return this._interfaceLanguage;
  }

  /**
   * Return an array containing the available languages passed as props in the constructor
   */
  getAvailableLanguages() {
    if (!this._availableLanguages) {
      this._availableLanguages = [];
      Object.keys(this._props).forEach((key) => {
        this._availableLanguages.push(key);
      });
    }
    return this._availableLanguages;
  }

  // Format the passed string replacing the numbered or tokenized placeholders
  // eg. 1: I'd like some {0} and {1}, or just {0}
  // eg. 2: I'd like some {bread} and {butter}, or just {bread}
  // eg. 3: I'd like some $ref{bread} and $ref{butter}, or just $ref{bread}
  // Use example:
  // eg. 1: strings.formatString(strings.question, strings.bread, strings.butter)
  // eg. 2: strings.formatString(strings.question, { bread: strings.bread, butter: strings.butter })
  // eg. 3: strings.formatString(strings.question)
  formatString(str, ...valuesForPlaceholders) {
    let input = str || "";
    if (typeof input === "string") {
      input = this.getString(str, null, true) || input;
    }
    const ref = input
      .split(placeholderReferenceRegex)
      .filter((textPart) => !!textPart)
      .map((textPart) => {
        if (textPart.match(placeholderReferenceRegex)) {
          const matchedKey = textPart.slice(5, -1);
          const referenceValue = this.getString(matchedKey);
          if (referenceValue) return referenceValue;
          if (this._opts.logsEnabled) {
            console.log(`No Localization ref found for '${textPart}' in string '${str}'`);
          }
          // lets print it another way so next replacer doesn't find it
          return `$ref(id:${matchedKey})`;
        }
        return textPart;
      })
      .join("");
    return ref
      .split(placeholderReplaceRegex)
      .filter((textPart) => !!textPart)
      .map((textPart) => {
        if (textPart.match(placeholderReplaceRegex)) {
          const matchedKey = textPart.slice(1, -1);
          let valueForPlaceholder = valuesForPlaceholders[matchedKey];
          // If no value found, check if working with an object instead
          if (valueForPlaceholder === undefined) {
            const valueFromObjectPlaceholder = valuesForPlaceholders[0][matchedKey];
            if (valueFromObjectPlaceholder !== undefined) {
              valueForPlaceholder = valueFromObjectPlaceholder;
            } else {
              // If value still isn't found, then it must have been undefined/null
              return valueForPlaceholder;
            }
          }

          return valueForPlaceholder;
        }
        return textPart;
      })
      .join("");
  }

  // Return a string with the passed key in a different language or defalt if not set
  // We allow deep . notation for finding strings
  getString(key, language, omitWarning = false) {
    try {
      let current = this._props[language || this._language];
      const paths = key.split(".");
      for (let i = 0; i < paths.length; i += 1) {
        if (current[paths[i]] === undefined) {
          throw Error(paths[i]);
        }
        current = current[paths[i]];
      }
      return current;
    } catch (ex) {
      if (!omitWarning && this._opts.logsEnabled) {
        console.log(`No localization found for key '${key}' and language '${language}', failed on ${ex.message}`);
      }
    }
    return null;
  }

  /**
   * The current props (locale object)
   */
  getContent() {
    return this._props;
  }
}
export default LocalizedStrings;
