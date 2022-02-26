import React from "react";
import { Page, Toolbar, ToolbarButton } from "react-onsenui";
import native from "@Native/index";
import * as monacoEditor from "monaco-editor/esm/vs/editor/editor.api";
import { ToolbarBuilder } from "@Builders";
import MDIcon from "@Components/MDIcon";
import AceEditor from "react-ace";
import { Props, States } from "./interface";
import Editor, { Monaco } from "@monaco-editor/react";
import { Ace } from "ace-builds";
import ons from "onsenui";
import editorTheme from "./editorTheme";
import tools from "@Misc/tools";

class EditorActivity extends React.Component<Props, States> {
  public constructor(props: any) {
    super(props);
    this.state = {
      isContextOpen: false,
      data: this.props.extras.value,
      types: "",
    };
  }

  public componentDidMount = () => {
    tools.getMisc(
      "editor.d.ts",
      (data: any) => {
        this.setState({ types: data });
      },
      { json: true }
    );
  };

  private renderToolbar = () => {
    return (
      <Toolbar>
        <ToolbarBuilder
          title={"Editor"}
          onBackButton={this.props.popPage}
          hasWindowsButtons={true}
          addToolbarButton={
            <>
              {(() => {
                if (native.isWindows || native.isAndroid) {
                  return;
                } else {
                  return (
                    <>
                      <ToolbarButton
                        id="menu-click"
                        onClick={() => {
                          const getPlaygroundCode = native.getPref("playground");
                          native.eval(getPlaygroundCode, {
                            plugin: {
                              name: "playground",
                            },
                          });
                        }}
                      >
                        <MDIcon icon="code" size="24" ignoreDarkmode={true}></MDIcon>
                      </ToolbarButton>
                    </>
                  );
                }
              })()}
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

  private openFile = () => {
    ons.notification.prompt("Notification").then((input) => {
      const f = input;
    });
  };

  private save = () => {
    const { pluginName, fileName } = this.props.extras;
    const confirm_ = confirm("Are you sure to save this file? Untested files can crash the app.");
    if (confirm_) {
      if (native.isAndroid || native.isWindows) {
        native.fs.writeFile(`plugins/${pluginName}/${fileName}`, this.state.data);
      } else {
        native.setPref("playground", this.state.data);
      }
    }
  };

  private onAndroidEditorLoad(editor: Ace.Editor) {
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

  private createDependencyProposals = (monaco: typeof monacoEditor, range: any): any => {
    // returning a static list of proposals, not even looking at the prefix (filtering is done by the Monaco editor),
    // here you could do a server side lookup
    return [
      {
        label: "native",
        kind: monaco.languages.CompletionItemKind.Function,
        documentation: "",
        insertText: "native",
        range: range,
      },
      {
        label: "ignore",
        kind: monaco.languages.CompletionItemKind.Function,
        documentation: "",
        insertText: "// @ts-ignore",
        range: range,
      },
    ];
  };

  private editorDidMount = (editor: monacoEditor.editor.IStandaloneCodeEditor, monaco: Monaco) => {
    const { types } = this.state;
    monaco.editor.defineTheme("editorTheme", editorTheme);
    monaco.editor.setTheme("editorTheme");

    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: false,
      noSuggestionDiagnostics: false,
    });

    // compiler options
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      // @ts-ignore
      target: monaco.languages.typescript.ScriptTarget.ES6,
      allowNonTsExtensions: true,
    });

    const libUri = "ts:filename/editor.d.ts";
    monaco.languages.typescript.javascriptDefaults.addExtraLib(types, libUri);
    // When resolving definitions and references, the editor will try to use created models.
    // Creating a model for the library allows "peek definition/references" commands to work with the library.
    if (monaco.editor.getModels().length === 0) {
      monaco.editor.createModel(types, "typescript", monaco.Uri.parse(libUri));
    }

    monaco.languages.registerCompletionItemProvider("javascript", {
      provideCompletionItems: (model, position) => {
        const word = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        };
        return {
          suggestions: this.createDependencyProposals(monaco, range),
        };
      },
    });
    editor.focus();
  };

  private onChange = (newValue: any, e: any) => {
    this.setState({
      data: newValue,
    });
  };

  public render() {
    const { data } = this.state;
    if (native.isWindows || native.isDesktop) {
      return (
        <Page modifier={native.checkPlatformForBorderStyle} renderToolbar={this.renderToolbar}>
          <Editor
            height="100%"
            defaultLanguage="javascript"
            defaultValue={data}
            options={{
              selectOnLineNumbers: true,
              minimap: {
                enabled: false,
              },
            }}
            onChange={this.onChange}
            onMount={this.editorDidMount}
          />
        </Page>
      );
    } else {
      return (
        <Page modifier={native.checkPlatformForBorderStyle} renderToolbar={this.renderToolbar}>
          <AceEditor
            placeholder="Write code ..."
            mode="javascript"
            theme="nord_dark"
            name="blah2"
            onLoad={this.onAndroidEditorLoad}
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
}

export default EditorActivity;