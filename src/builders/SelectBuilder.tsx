import * as React from "react";
import { Dialog, Input, List, ListItem } from "react-onsenui";

class SelectBuilder extends React.Component<{}, { title: string }> {
  public render() {
    return (
      <Dialog
        // @ts-ignore
        cancelable
      >
        <p className="alert-dialog-title" style={{ fontWeight: 500, width: "100%" }}>
          Switch language
        </p>
        <List modifier="material">{this.props.children}</List>
      </Dialog>
    );
  }
}

class SelcetOption extends React.Component<{}, {}> {
  public render() {
    return (
      <>
        <ListItem tappable modifier="material">
          <label className="left">
            <Input name="lg" type="radio" input-id="lang1" value="lang1" />
          </label>
          <label htmlFor="lang1" className="center">
            lang1
          </label>
        </ListItem>
      </>
    );
  }
}

export {};
