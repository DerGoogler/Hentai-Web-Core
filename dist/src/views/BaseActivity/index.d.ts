import * as React from "react";
import tools from "@Misc/tools";
import native from "@Native/index";
import ons from "onsenui";
import { ChangelogActivity, PluginsActivity, SettingsActivity, TextFetchActivity, EditorActivity, LoginActivity, MainActivity } from "@Views";
import { Props } from "./interface";
import { PushPageProps } from "@Types/init";
import News from "@Components/News";
import { Page, Toolbar, Tabbar, ToolbarButton, Button, Input, Icon, BackButton, RouterNavigator, Fab, Splitter, SplitterSide, SplitterContent, List, ListItem } from "react-onsenui";
import { ToolbarBuilder, TabbarBuilder, ListDialogBuilder } from "@Builders";
import MDIcon from "@Components/MDIcon";
import ContentBody from "@Components/ContentBody";
import AnimeContent from "@Components/AnimeContent";
import AceEditor from "react-ace";
/**
 * This should only used on Activitys
 */
declare class BaseActivity<P = {}, S = {}, SS = any> extends React.Component<P & Props, S, SS> {
    /**
     * Gets the app packages
     */
    readonly pkg: {
        name: string;
        version: string;
        description: string;
        main: string;
        keywords: string[];
        author: string;
        license: string;
        scripts: {
            "build-dev": string;
            "build-prod": string;
            "make-types": string;
            start: string;
        };
        dependencies: {
            "@babel/polyfill": string;
            "@babel/standalone": string;
            "@material-ui/core": string;
            "@monaco-editor/react": string;
            "@types/react": string;
            "@types/react-onsenui": string;
            "ace-builds": string;
            autoprefixer: string;
            axios: string;
            "babel-core": string;
            "babel-plugin-transform-runtime": string;
            "babel-preset-es2015": string;
            boolean: string;
            bootstrap: string;
            "bootstrap-icons": string;
            bota64: string;
            "core-js": string;
            "crypto-js": string;
            electron: string;
            eruda: string;
            "eruda-dom": string;
            "file-saver": string;
            "highlight.js": string;
            hmfull: string;
            "js-yaml": string;
            "js-yaml-loader": string;
            jss: string;
            "jss-preset-default": string;
            "license-checker": string;
            "loader-utils": string;
            "localstorage-slim": string;
            "markdown-to-jsx": string;
            "material-icons": string;
            "module-alias": string;
            "monaco-vscode-textmate-theme-converter": string;
            mousetrap: string;
            "node-eval": string;
            onsenui: string;
            "path-browserify": string;
            react: string;
            "react-ace": string;
            "react-bootstrap": string;
            "react-device-detect": string;
            "react-dom": string;
            "react-onsenui": string;
            "react-translated": string;
            "safer-eval": string;
            "universal-cookie": string;
            "vm-browserify": string;
            "web-vitals": string;
        };
        devDependencies: {
            "@babel/core": string;
            "@babel/plugin-proposal-class-properties": string;
            "@babel/preset-env": string;
            "@babel/preset-react": string;
            "@types/babel__core": string;
            "@types/babel__standalone": string;
            "@types/crypto-js": string;
            "@types/js-yaml": string;
            "@types/loader-utils": string;
            "@types/lodash": string;
            "@types/mousetrap": string;
            "@types/node": string;
            "@types/react-dom": string;
            "@types/webpack-dev-server": string;
            "@types/webpack-sources": string;
            "babel-loader": string;
            "brotli-webpack-plugin": string;
            "compression-webpack-plugin": string;
            "css-loader": string;
            "css-minimizer-webpack-plugin": string;
            "file-loader": string;
            "html-webpack-plugin": string;
            "javascript-obfuscator": string;
            "less-loader": string;
            "mini-css-extract-plugin": string;
            "monaco-editor-webpack-plugin": string;
            postcss: string;
            "postcss-loader": string;
            "raw-loader": string;
            sass: string;
            "sass-loader": string;
            "source-map": string;
            "style-loader": string;
            "ts-loader": string;
            "ts-node": string;
            typescript: string;
            "url-loader": string;
            "vscode-theme-to-monaco-theme-node": string;
            webpack: string;
            "webpack-cli": string;
            "webpack-sources": string;
        };
    };
    /**
     * Native calls for Windows and Android
     */
    native: typeof native;
    tools: typeof tools;
    readonly ons: typeof ons;
    readonly string: import("../../localization/utils/types").Language & import("../../localization/utils/types").StringAguments;
    readonly images: {
        sfw: string[];
        nsfw: string[];
    };
    Toolbar: typeof Toolbar;
    Tabbar: typeof Tabbar;
    ToolbarButton: typeof ToolbarButton;
    Button: typeof Button;
    List: typeof List;
    ListItem: typeof ListItem;
    Icon: typeof Icon;
    Input: typeof Input;
    SplitterContent: typeof SplitterContent;
    SplitterSide: typeof SplitterSide;
    Splitter: typeof Splitter;
    Page: typeof Page;
    Fab: typeof Fab;
    RouterUtil: {
        init: (routes: any[]) => import("react-onsenui").RouteConfig;
        replace: (config: {
            routeConfig: import("react-onsenui").RouteConfig;
            route: any;
            options?: any;
            key?: any;
        }) => import("react-onsenui").RouteConfig;
        reset: (config: {
            routeConfig: import("react-onsenui").RouteConfig;
            route: any;
            options?: any;
            key?: any;
        }) => import("react-onsenui").RouteConfig;
        push: (config: {
            routeConfig: import("react-onsenui").RouteConfig;
            route: any;
            options?: any;
            key?: any;
        }) => import("react-onsenui").RouteConfig;
        pop: (config: {
            routeConfig: import("react-onsenui").RouteConfig;
            options?: any;
            key?: any;
        }) => import("react-onsenui").RouteConfig;
        postPush: (routeConfig: import("react-onsenui").RouteConfig) => import("react-onsenui").RouteConfig;
        postPop: (routeConfig: import("react-onsenui").RouteConfig) => import("react-onsenui").RouteConfig;
    };
    RouterNavigator: typeof RouterNavigator;
    BackButton: typeof BackButton;
    AceEditor: typeof AceEditor;
    AnimeContent: typeof AnimeContent;
    News: typeof News;
    MDIcon: typeof MDIcon;
    ContentBody: typeof ContentBody;
    ToolbarBuilder: typeof ToolbarBuilder;
    TabbarBuilder: typeof TabbarBuilder;
    ListDialogBuilder: typeof ListDialogBuilder;
    EditorActivity: typeof EditorActivity;
    TextFetchActivity: typeof TextFetchActivity;
    MainActivity: typeof MainActivity;
    SettingsActivity: typeof SettingsActivity;
    PluginsActivity: typeof PluginsActivity;
    ChangelogActivity: typeof ChangelogActivity;
    LoginActivity: typeof LoginActivity;
    constructor(props: Readonly<P & Props> | P & Props);
    componentDidMount(): void;
    componentDidUpdate(): void;
    private updateStyle;
    pushPage(props: PushPageProps): void;
    private initialPluginState;
    setDiscordStatus: () => string;
    /**
     * @default #4a148c
     */
    setStatusbarColor(): string;
    /**
     * Renders the Toolbar
     */
    renderToolbar(): JSX.Element;
    /**
     * Renders the page
     */
    renderPage(): JSX.Element;
    renderModal(): JSX.Element;
    renderBottomToolbar(): JSX.Element;
    renderFixed(): JSX.Element;
    onInit(): void;
    onShow(): void;
    onHide(): void;
    onInfiniteScroll(): void;
    /**
     * Don't use that if the Activity is with `BaseActivity` extended
     * Use `renderPage` instead
     */
    render: () => JSX.Element;
}
export default BaseActivity;
