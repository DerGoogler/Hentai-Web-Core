export {};

declare global {
  interface Window {
    buildconfig: any;
    environment: any;
    file: any;
    os: any;
    sharedpreferences: any;
    utils: any;
  }

  interface GlobalEventHandlersEventMap {
    onbackbutton: Event;
    onresume: Event;
  }

  interface SharedPreferencesKeys {
    katei: Array<Kartei>;
    introFinised: boolean;
    /**
     * Darkmode
     */
    darkmode: boolean;
    length: number;
  }

  interface Options {
    readonly?: boolean;
  }

  interface Karten extends Options {
    index?: number;
    shortDescription: string;
    description: string;
  }

  interface Kartei extends Options {
    group: string;
    name: string;
    description: string;
    karten: Karten[];
  }

  interface PushPropsCore<E = {}> {
    component: React.ElementType;
    props: {
      key: string;
      extra: E;
      readonly popPage?: () => void;
      readonly pushPage?: (...args: [props: PushPropsCore<E>]) => void; //
    };
  }

  interface PushProps<E = {}> {
    readonly extra: E;
    // readonly context: {
    readonly popPage: () => void;
    readonly pushPage: <T>(props: PushPropsCore<T>) => void;
    readonly splitter: {
      readonly show: () => void;
      readonly hide: () => void;
      readonly state: boolean;
    };
    readonly onBackPressed: (callback: () => void) => void;
    readonly onResume: (callback: () => void) => void;
    // };
  }

  interface UseActivity<E = {}> {
    readonly context: {
      readonly popPage: () => void;
      readonly pushPage: <T>(props: PushPropsCore<T>) => void;
      readonly splitter: {
        readonly show: () => void;
        readonly hide: () => void;
        readonly state: () => boolean;
      };
    };
  }

  interface DrawerListItems {
    title: string;
    content: DrawerListItemsContent[];
  }

  interface DrawerListItemsContent extends DrawerListItemsContentSeperate {
    children?: React.ReactNode;
    modifier?: string | undefined;
    tappable?: boolean | undefined;
    tapBackgroundColor?: string | undefined;
    lockOnDrag?: boolean | undefined;
    expandable?: boolean | undefined;
    expanded?: boolean | undefined;
  }

  interface DrawerListItemsContentSeperate {
    onClick?: <T = Element>(
      hide: () => void,
      pushPage: <A = {}>(...args: [props: PushPropsCore<A>]) => void,
      event: React.MouseEvent<T, MouseEvent>
    ) => void | undefined;
  }

  interface KarteiSet {
    name: string;
    desc: string;
    cdn: string;
  }

  interface KarteiSetRoot {
    name: string;
    sets: KarteiSet[];
  }

  // Custom elements
  type HTMLAttributes<E, P = {}> = React.DetailedHTMLProps<React.HTMLAttributes<E> & P, E>;
  type AnchorHTMLAttributes<E, P = {}> = React.DetailedHTMLProps<React.AnchorHTMLAttributes<E> & P, E>;

  namespace JSX {
    interface IntrinsicElements {
      "license-container": HTMLAttributes<HTMLDivElement>;
      "license-card-wrapper": HTMLAttributes<HTMLDivElement>;
      "license-card-title": HTMLAttributes<HTMLDivElement>;
      "license-card-name": HTMLAttributes<HTMLSpanElement>;
      "license-card-author": HTMLAttributes<HTMLSpanElement>;
      "license-card-description": HTMLAttributes<HTMLSpanElement>;
      "license-card-diver": HTMLAttributes<HTMLHRElement>;
      "license-card-infos": HTMLAttributes<HTMLDivElement>;
      "license-card-version": HTMLAttributes<HTMLSpanElement>;
      "license-card-license": HTMLAttributes<HTMLSpanElement>;
      karteilink: HTMLAttributes<HTMLDivElement>;
      "kartei-link-wrapper": HTMLAttributes<HTMLDivElement>;
    }
  }
}
