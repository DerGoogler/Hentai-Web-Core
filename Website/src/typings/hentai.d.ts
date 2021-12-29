export interface HentaiTypes {
  note: string;
  source: any;
  isNew?: boolean;
}

export interface MainButtons {
  sfw: HentaiTypes[];
  nsfw: HentaiTypes[];
  title?: string;
  options: {
    title?: string;
    hasBackbutton: boolean;
    hasWindowsButton: boolean;
    addToolbarButtons?: JSX.Element;
    addToolbarButtonPosition?: "left" | "right";
    hasDarkMode?: boolean;
  };
}
