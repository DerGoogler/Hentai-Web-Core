import ons from "onsenui";
import { isValidElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

interface Alert {
  title: string;
  messageHTML: string | JSX.Element;
  cancelable: boolean;
  callback: Function;
  buttons: AlertButtons;
}

interface AlertButtons {
  positive: AlertButton;
  negative: AlertButton;
}

interface AlertButton {
  title: string;
  callback: Function | undefined;
}

type BuilderConstructorOmit<T extends string = string> = Omit<Builder, T | "dialog">;

interface Builder {
  setTitle(value: string): BuilderConstructorOmit<"setTitle">;
  setMessage(value: string | JSX.Element): BuilderConstructorOmit<"setMessage">;
  setPositiveButton(title: string, callback?: Function): BuilderConstructorOmit<"setPositiveButton">;
  setNegativeButtom(title: string, callback?: Function): BuilderConstructorOmit<"setNegativeButtom">;
  setCancelable(cancel: boolean): BuilderConstructorOmit<"setCancelable">;
  show(): void;
}

interface AlertOptions {
  message?: string;
  messageHTML?: string | JSX.Element;
  buttonLabel?: string;
  buttonLabels?: string[];
  primaryButtonIndex?: number;
  cancelable?: boolean;
  animation?: string;
  title?: string;
  modifier?: string;
  callback?: any;
  id?: string;
}

class AlertDialogClass implements Builder {
  private dialog: Alert;

  public constructor() {
    this.dialog = {
      title: "",
      messageHTML: "",
      cancelable: true,
      callback: () => {},
      buttons: {
        positive: {
          title: "",
          callback: () => {},
        },
        negative: {
          title: "",
          callback: () => {},
        },
      },
    };
  }

  public setTitle(value: string): BuilderConstructorOmit<"setTitle"> {
    this.dialog.title = value;
    return this;
  }

  public setMessage(value: string | JSX.Element): BuilderConstructorOmit<"setMessage"> {
    if (isValidElement(value)) {
      this.dialog.messageHTML = renderToStaticMarkup(value as any);
    } else {
      this.dialog.messageHTML = value;
    }
    return this;
  }

  public setPositiveButton(title: string, callback?: Function): BuilderConstructorOmit<"setPositiveButton"> {
    this.dialog.buttons.positive.title = title;
    this.dialog.buttons.positive.callback = callback;
    return this;
  }

  public setNegativeButtom(title: string, callback?: Function): BuilderConstructorOmit<"setNegativeButtom"> {
    this.dialog.buttons.negative.title = title;
    this.dialog.buttons.negative.callback = callback;
    return this;
  }

  public setCancelable(cancel: boolean): BuilderConstructorOmit<"setCancelable"> {
    this.dialog.cancelable = cancel;
    return this;
  }

  public show(): void {
    const { positive, negative } = this.dialog.buttons;
    const { title, messageHTML } = this.dialog;
    const pla: AlertOptions = {
      buttonLabels: [],
      animation: "default",
      primaryButtonIndex: 0,
      cancelable: true,
      callback: (index: number) => {
        switch (index) {
          case 0:
            if (typeof positive.callback == "function") positive.callback();
            break;
          case 1:
            if (typeof negative.callback == "function") negative.callback();
            break;
          default:
            // Nothing
            break;
        }
      },
    };
    pla.messageHTML = messageHTML;
    pla.title = title;
    if (positive.title) {
      pla.buttonLabels?.push(positive.title);
    }
    if (negative.title) {
      pla.buttonLabels?.push(negative.title);
    }
    // @ts-ignore
    ons.notification.confirm(pla);
  }
}

type AlertDialog = typeof AlertDialog[keyof typeof AlertDialog];
const AlertDialog: { readonly Builder: Builder } = {
  Builder: new AlertDialogClass(),
} as const;

export default AlertDialog;
