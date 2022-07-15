import * as React from "react";
import { ActionSheet, ActionSheetButton } from "react-onsenui";
import tools from "../misc/tools";

interface MenuBuild {
  id?: string;
  className?: string;
  icon?: string;
  style?: React.CSSProperties;
  onClick?: Function;
  text: string;
  modifier?: string;
}

interface Options {
  isOpen: boolean;
  animation?: string;
  modifier?: string;
  onCancel: Function;
  isCancelable?: boolean;
  title: string;
}

/**
 * Creats an menu
 */
class ActionSheetBuilder extends React.Component<{ data: MenuBuild[]; options: Options }> {
  public render() {
    const { data, options } = this.props;

    const result = data.map((item: MenuBuild) => (
      // @ts-ignore
      <ActionSheetButton
        icon={item.icon}
        style={item.style}
        modifier={item.modifier}
        onClick={() => {
          if (typeof item.onClick == "function") {
            item.onClick();
          } else {
            throw new Error("Invalid onClick in MenuBuilder");
          }
        }}
      >
        {item.text}
      </ActionSheetButton>
    ));

    return (
      // @ts-ignore
      <ActionSheet
        isOpen={options.isOpen}
        animation={tools.typeCheck(options.animation, "default")}
        modifier={options.modifier}
        onCancel={() => {
          if (typeof options.onCancel == "function") {
            options.onCancel();
          } else {
            throw new Error("onCancel is not a function");
          }
        }}
        isCancelable={tools.typeCheck(options.isCancelable, true)}
        title={options.title}
      >
        {result}
      </ActionSheet>
    );
  }
}

export default ActionSheetBuilder;
