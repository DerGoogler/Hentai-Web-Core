// type Icon = `${string}-${string}`;

interface ListOptions {
  key?: string;
  disabled?: boolean | any;
  id?: string;
  style?: React.CSSProperties;
  /**
   * @deprecated This element slow down the rendering
   */
  expandableContent?: JSX.Element | HTMLElement | string | undefined;
  /**
   * @deprecated This element slow down the rendering
   */
  expandable?: boolean;
  tappable?: boolean;
  unTyped?: any;
  modifier?: string;
  /**
   * Makes an dialog
   */
  helper?: Helper;
  type: "switch" | "select" | "";
  text: string;
  /**
   * Performs an onClick event to the current list item
   * @param key Get the key from the current list item
   * @param e Event
   */
  onClick?(key: string | undefined, e?: MouseEvent): void;
  selectValue?: SelectValue[];
  icon?: string;
  selectDefaultValue?: string;
  switchDefaultValue?: boolean;
  /**
   *
   * @param {Event} e Event
   * @param {String} key Returns the key
   * @param {Void} keepDefaultFuntion This will keep the default function
   */
  callback?(e?: any, key?: string | undefined, keepDefaultFuntion?: void): void;
}

interface Helper {
  /**
   * Hold the current list item text to open the dialog
   */
  text: string;
  /**
   * @default true
   */
  cancelable?: boolean;
}

interface SelectValue {
  text: string;
  value: string;
  disabled?: boolean;
}

interface ListInterface {
  title: string;
  id?: string;
  unTyped?: any;
  style?: React.CSSProperties;
  className?: string;
  content: ListOptions[];
}

export { ListOptions, ListInterface, SelectValue };
