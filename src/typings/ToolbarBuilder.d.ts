interface ToolbarBuilderInterface {
  title: string | JSX.Element;
  /**
   * Due not use it with `addToolbarButton="left"`!
   *
   * Remove the `onBackButton` attr or put `false` inside!
   */
  onBackButton?: boolean;
  hasWindowsButtons: boolean;
  /**
   * Object
   */
  addToolbarButton?: JSX.Element;
  addToolbarButtonPosition?: "left" | "right";
  /**
   * Enable dark mode for this activity that includes this toolbar.
   * @deprecated
   */
  hasDarkMode?: boolean;
  modifier?: string;
}

export { ToolbarBuilderInterface };
