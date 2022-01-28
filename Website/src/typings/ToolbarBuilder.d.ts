type Position = "left" | "right";

interface ToolbarBuilderInterface {
  title: string | JSX.Element;
  onBackButton?: boolean;
  hasWindowsButtons: boolean;
  /**
   * Object
   */
  addToolbarButton?: HTMLElement | JSX.Element;
  addToolbarButtonPosition?: Position;
  /**
   * Enable dark mode for this activity that includes this toolbar.
   */
  hasDarkMode?: boolean;
}

export { ToolbarBuilderInterface };
