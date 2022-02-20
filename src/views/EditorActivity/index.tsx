import React from "react";
import { Page, Toolbar, ToolbarButton } from "react-onsenui";
import native from "@Native/index";
import { ToolbarBuilder } from "@Builders";
import AceEditor from "react-ace";
import MDIcon from "@Components/MDIcon";
import { Props, States } from "./interface";

class EditorActivity extends React.Component<Props, States> {
  public constructor(props: any) {
    super(props);
    this.state = { data: this.props.extras.value };
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

  private onLoad(editor: any) {
    editor.completers.push({
      getCompletions: function (editor: any, session: any, pos: any, prefix: any, callback: any) {
        var completions: any[] = [];
        // we can use session and pos here to decide what we are going to show
        ["native", "__dirname", "HWPlugin", "ons", "tools", 'require("")', "document"].forEach(function (w) {
          completions.push({
            value: w,
            meta: "HWPlugin State",
          });
        });
        callback(null, completions);
      },
    });
    editor.getSession().getAnnotations();
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
          width="100%"
          height="100%"
          maxLines={Infinity}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={data}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            cursorStyle: "smooth",
            spellcheck: false,
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
