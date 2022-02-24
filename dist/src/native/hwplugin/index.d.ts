import { LanguageTypes } from "@Strings";
import { ListInterface } from "@Types/ListBuilder";
import { Styles } from "jss";
declare class HWPlugin {
    private pluginErrorString;
    private pluginName;
    constructor(pluginName: string);
    addSettings(items: ListInterface[]): void;
    removeSettings(): void;
    setPluginPref(key: string, content: string): void;
    getPluginPref(key: string): string;
    removePluginPref(key: string): void;
    getSelectedHardDevice(): string;
    require(path: any): void;
    library(url: string): void;
    strings(globals: any): LanguageTypes;
    private checkLanguage;
    func(func: {
        name: string;
        args: string;
        callback: string;
        run: string;
    }): void;
    loadCSS(x: Partial<Styles<keyof String, any, undefined>>): void;
    loadCSSfromFile(path: string): void;
    readFile(path: string, options?: {
        parse: {
            use: boolean;
            mode: "json" | "yaml";
        };
    }): string | any;
    mkDir(path: string): void;
    writeFile(path: string, content: string): void;
    isFileExist(path: string): boolean;
    get getAuthor(): string;
    get getVersion(): string;
    get getLanguage(): string;
    get getDescription(): string;
}
export default HWPlugin;
