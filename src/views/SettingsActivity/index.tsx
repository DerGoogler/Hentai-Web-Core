import { Toolbar } from "react-onsenui";
import { List } from "react-onsenui";
import settings from "@DataPacks/settings";
import { ToolbarBuilder, ListViewBuilder } from "@Builders";
import ContentBody from "@Components/ContentBody";
import { string } from "@Strings";
import { Props, States } from "./interface";
import { BaseActivity } from "@Views";

class SettingsActivity extends BaseActivity<Props, States> {
  public renderToolbar = () => {
    return (
      <Toolbar>
        <ToolbarBuilder
          title={string.settings}
          onBackButton={this.props.popPage}
          hasWindowsButtons={true}
          hasDarkMode={true}
        />
      </Toolbar>
    );
  };

  public renderPage() {
    return (
      <ContentBody>
        <List>
          <ListViewBuilder isPlugin={false} pluginName="" data={settings} />
        </List>
      </ContentBody>
    );
  }
}

export default SettingsActivity;
