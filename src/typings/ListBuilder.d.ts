// type Icon = `${string}-${string}`;

interface ListOptions {
  key?: string;
  disabled?: boolean | any;
  id?: string;
  style?: React.CSSProperties;
  expandableContent?: JSX.Element | HTMLElement | string | undefined;
  expandable?: boolean;
  tappable?: boolean;
  unTyped?: any;
  modifier?: string;
  helper?: Helper;
  type: "switch" | "select" | "";
  text: string;
  /**
   * Performs an onClick event to the current list item
   */
  onClick?: Function;
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
  text: string;
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
