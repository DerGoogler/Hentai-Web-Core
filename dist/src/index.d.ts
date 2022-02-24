import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/theme-nord_dark";
import "onsenui/css/onsenui-core.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "material-icons/iconfont/material-icons.css";
import "@Styles/default.scss";
import "@Styles/github/markdown-dark.scss";
import "@Styles/github/markdown-light.scss";
declare class Bootloader {
    private mountNode;
    private loadConsole;
    private loadActivity;
    private electronInit;
    /**
     * Loads styles dynamically
     */
    styleInit(): void;
    private androidSettingsinit;
    private makeExamplePlugin;
    private folderInit;
    init(): void;
}
export default Bootloader;
