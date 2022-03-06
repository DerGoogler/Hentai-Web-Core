import BaseComponent from "@Components/BaseComponent";
import tools from "@Misc/tools";
import { ListInterface } from "@Types/ListBuilder";
import { Dialog, List } from "react-onsenui";
import ListViewBuilder from "./ListViewBuilder";

interface Options {
  isOpen: boolean;
  animation?: string;
  modifier?: string;
  onCancel: Function;
  isCancelable?: boolean;
}

class ListDialogBuilder extends BaseComponent<{ data: ListInterface[]; options: Options }, { isOpen: boolean }> {
  public render = () => {
    const { data, options } = this.props;

    return (
      <Dialog
        isCancelable={tools.typeCheck(options.isCancelable, true)}
        animation={tools.typeCheck(options.animation, "default")}
        modifier={options.modifier}
        onCancel={() => {
          if (typeof options.onCancel == "function") {
            options.onCancel();
          } else {
            throw new Error("onCancel is not a function");
          }
        }}
        style={{
          overflowY: "auto",
        }}
        isOpen={options.isOpen}
      >
        <List style={{ height: "587px", overflowY: "auto" }}>
          <ListViewBuilder isPlugin={false} pluginName="" data={data} />
        </List>
      </Dialog>
    );
  }
}

export default ListDialogBuilder;
