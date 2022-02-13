import React from "react";
import { Page, Toolbar, ToolbarButton } from "react-onsenui";
import native from "@Native/index";
import ToolbarBuilder from "@Builders/ToolbarBuilder";
import "@Styles/github/markdown-dark.scss";
import "@Styles/github/markdown-light.scss";
import Bootloader from "@Bootloader";
import AceEditor from "react-ace";
import MDIcon from "@Components/MDIcon";

class EditorActivity extends React.Component<{ extras: any; popPage: any }, { data: string }> {
  public constructor(props: any) {
    super(props);
    this.state = { data: this.props.extras.value };
  }

  public componentDidUpdate() {
    new Bootloader().styleInit();
  }

  private renderToolbar = () => {
    return (
      <Toolbar>
        <ToolbarBuilder
          title={"Editor"}
          onBackButton={this.props.popPage}
          hasWindowsButtons={true}
          addToolbarButton={
            <>
              <ToolbarButton id="menu-click" onClick={this.save}>
                <MDIcon icon="save" size="24" ignoreDarkmode={true}></MDIcon>
              </ToolbarButton>
            </>
          }
          addToolbarButtonPosition="right"
        />
      </Toolbar>
    );
  };

  private onLoad() {
    return false;
  }

  private onChange = (newValue: any) => {
    this.setState({
      data: newValue,
    });
  };

  private save = () => {
    const { pluginName, fileName } = this.props.extras;
    const confirm_ = confirm("Are you sure to save this file? Untested files can crash the app.");
    if (confirm_) {
      native.fs.writeFile(`plugins/${pluginName}/${fileName}`, this.state.data);
    }
  };

  public render() {
    const { data } = this.state;
    return (
      <Page modifier={native.checkPlatformForBorderStyle} renderToolbar={this.renderToolbar}>
        <AceEditor
          placeholder="Write code ..."
          mode="javascript"
          theme="nord_dark"
          name="blah2"
          onLoad={this.onLoad}
          onChange={this.onChange}
          fontSize={14}
          maxLines={Infinity}
          style={{ width: "calc(100% - 2px)", marginLeft: "1px", marginRight: "1px" }}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={data}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,
          }}
        />
      </Page>
    );
  }
}

export default EditorActivity;
