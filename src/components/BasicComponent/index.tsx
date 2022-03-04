import { ToolbarBuilder, TabbarBuilder, ListDialogBuilder } from "@Builders";
import AnimeContent from "@Components/AnimeContent";
import ContentBody from "@Components/ContentBody";
import MDIcon from "@Components/MDIcon";
import News from "@Components/News";
import images from "@DataPacks/images";
import tools from "@Misc/tools";
import native from "@Native/index";
import pkg from "./../../../package.json"
import { string } from "@Strings";
import { EditorActivity, TextFetchActivity, MainActivity, SettingsActivity, PluginsActivity, ChangelogActivity, LoginActivity } from "@Views";
import ons from "onsenui";
import * as React from "react"
import { Toolbar, Tabbar, ToolbarButton, Button, List, ListItem, Icon, Input, SplitterContent, SplitterSide, Splitter, Page, Fab, RouterUtil, RouterNavigator, BackButton } from "react-onsenui";

interface Props {
    setStatusbarColor?: string
}

interface States {

}

class BasicComponent<P = {}, S = {}, SS = any> extends React.Component<React.HTMLAttributes<Element> & Props & P, Element & S, SS> {
    /**
     * Gets the app packages
     */
    public readonly pkg = pkg;
    /**
     * Native calls for Windows and Android
     */
    public native = native
    public tools = tools
    public readonly ons = ons
    public readonly string = string
    public readonly images = images

    // Onsen UI Components
    public Toolbar = Toolbar
    public Tabbar = Tabbar
    public ToolbarButton = ToolbarButton
    public Button = Button
    public List = List
    public ListItem = ListItem
    public Icon = Icon
    public Input = Input
    public SplitterContent = SplitterContent
    public SplitterSide = SplitterSide
    public Splitter = Splitter
    public Page = Page
    public Fab = Fab
    public RouterUtil = RouterUtil
    public RouterNavigator = RouterNavigator
    public BackButton = BackButton

    // Components
    public AnimeContent = AnimeContent
    public News = News
    public MDIcon = MDIcon
    public ContentBody = ContentBody

    // Builders
    public ToolbarBuilder = ToolbarBuilder
    public TabbarBuilder = TabbarBuilder
    public ListDialogBuilder = ListDialogBuilder

    // Views
    public EditorActivity = EditorActivity
    public TextFetchActivity = TextFetchActivity
    public MainActivity = MainActivity
    public SettingsActivity = SettingsActivity
    public PluginsActivity = PluginsActivity
    public ChangelogActivity = ChangelogActivity
    public LoginActivity = LoginActivity

    public constructor(props: Readonly<P & Props> | P & Props) {
        super(props);
        this.render = this.render.bind(this)
        const { setStatusbarColor } = this.props
        native.android.setStatusbarColor(setStatusbarColor ? setStatusbarColor : "#4a148c")
    }

    public renderComponent(): JSX.Element {
        return <></>
    }

    /**
     * Don't use if the BasicComonent is extended
     */
    public render(): JSX.Element {
        return (
            <hw-component>
                {this.renderComponent()}
            </hw-component>)
    }
}

export default BasicComponent