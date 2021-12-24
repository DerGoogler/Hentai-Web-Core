// Type definitions for React OnSenui (react-onsenui) 1.4.0
// Project: https://onsen.io/v2/api/react/
// Definitions by: Ozytis <https://ozytis.fr>
// Extends by: Derek.Chia <snipking@gmail.com>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.3

import { Component, HTMLProps, FormEvent, MouseEvent, ReactInstance, ChangeEvent } from "react";

export interface Modifiers_string {
  default?: string;
  material?: string;
}

export interface Modifiers_number {
  default?: number;
  material?: number;
}

export interface AnimationOptions {
  duration?: number;
  delay?: number;
  timing?: string;
}

/*** splitter ***/
export interface SplitterSideBaseEvent extends Event {
  side: SplitterSide;
}

export interface SplitterSideModeChangeEvent extends SplitterSideBaseEvent {
  mode: "collapse" | "split";
}

export interface SplitterSidePreEvent extends SplitterSideBaseEvent {
  cancel(): void;
}

export class SplitterSide extends Component<
  {
    side?: "left" | "right";
    collapse?: "portrait" | "landscape" | boolean;
    isOpen?: boolean;
    onOpen?(event?: SplitterSideBaseEvent): void;
    onPreOpen?(event?: SplitterSidePreEvent): void;
    onPreClose?(event?: SplitterSidePreEvent): void;
    onModeChange?(event?: SplitterSideModeChangeEvent): void;
    onClose?(event?: SplitterSideBaseEvent): void;
    swipeable?: boolean;
    swipeTargetWidth?: number;
    width?: number;
    animation?: "overlay" | "default" | "push" | "reveal";
    animationOptions?: AnimationOptions;
    openThreshold?: number;
    mode?: "collapse" | "split";
  } & HTMLProps<any>,
  any
> {}

export class SplitterContent extends Component<{} & HTMLProps<any>> {}

export class Splitter extends Component<{} & HTMLProps<any>> {}

/*** toolbar ***/

export class Toolbar extends Component<{} & HTMLProps<any>> {}

export class BottomToolbar extends Component<
  {
    modifier?: string;
  } & HTMLProps<any>,
  any
> {}

export class ToolbarButton extends Component<
  {
    modifier?: string;
    disabled?: boolean;
    onClick?(e?: MouseEvent<HTMLElement>): void;
  } & HTMLProps<any>,
  any
> {}

/*** icon ***/
export class Icon extends Component<
  {
    modifier?: string;
    icon?: string | Modifiers_string;
    size?: number | Modifiers_number;
    rotate?: 90 | 180 | 270;
    fixedWidth?: boolean;
    spin?: boolean;
  } & HTMLProps<any>,
  any
> {}

/*** page ***/

export class Page extends Component<
  {
    contentStyle?: any;
    modifier?: string;
    renderModal?(): JSX.Element | HTMLElement;
    renderToolbar?(): JSX.Element | HTMLElement;
    renderBottomToolbar?(): JSX.Element | HTMLElement;
    renderFixed?(): JSX.Element | HTMLElement;
    onInit?(event: Event): void;
    onShow?(event: Event): void;
    onHide?(event: Event): void;
    onInfiniteScroll?(done: Function): void;
    onDeviceBackButton?(): void;
  } & HTMLProps<any>,
  any
> {}

/*** Grid ***/
export class Col extends Component<
  {
    verticalAlign?: "top" | "bottom" | "center";
    width?: string;
  } & HTMLProps<any>,
  any
> {}

export class Row extends Component<
  {
    verticalAlign?: "top" | "bottom" | "center";
  } & HTMLProps<any>,
  any
> {}

/*** Navigation ***/
export class BackButton extends Component<
  {
    modifier?: string;
    onClick?(navigator: Navigator): void;
  } & HTMLProps<any>,
  any
> {}

export interface NavigatorPushPopOptions {
  animation?: "slide" | "lift" | "fade" | "none" | string;
  animationOptions?: AnimationOptions;
  callback?(): void;
  refresh?: boolean;
  date?: any;
}

export interface NavigatorPreEvent extends Event {
  navigator: any;
  currentPage: any;
  cancel(): void;
}

export interface NavigatorPostEvent extends Event {
  navigator: any;
  enterPage: any;
  leavePage: any;
}

export class Navigator extends Component<
  {
    renderPage(route?: any, navigator?: Navigator): any;
    initialRouteStack?: string[];
    initialRoute?: any;
    onPrePush?(event?: NavigatorPreEvent): void;
    onPostPush?(event?: NavigatorPostEvent): void;
    onPrePop?(event?: NavigatorPreEvent): void;
    onPostPop?(event?: NavigatorPostEvent): void;
    animation?: "slide" | "lift" | "fade" | "none" | string;
    animationOptions?: AnimationOptions;
    swipeable?: boolean;
    swipePop?(): void;
    onDeviceBackButton?(): void;
    swipeTargetWidth?: string;
    swipeThreshold?: number;
  } & HTMLProps<any>,
  any
> {
  resetPage(route: any, options?: NavigatorPushPopOptions): void;
  replacePage(route: any, options?: NavigatorPushPopOptions): void;
  resetPageStack(route: any, options?: NavigatorPushPopOptions): void;
  pushPage(route: any, options?: NavigatorPushPopOptions): void;
  popPage(options?: NavigatorPushPopOptions): void;
  routes: any[];
  pages: any[];
}

/*** Carousel ***/
export interface CarouselBaseEvent extends Event {
  carousel: Carousel;
}

export interface CarouselPostChangeEvent extends CarouselBaseEvent {
  activeIndex: number;
  lastActiveIndex: number;
}

export interface CarouselOverscrollEvent extends CarouselBaseEvent {
  activeIndex: number;
  direction: "up" | "down" | "left" | "right";
  waitToReturn(deferred: Promise<any>): void;
}

export class Carousel extends Component<
  {
    direction?: "horizontal" | "vertical";
    fullscreen?: boolean;
    overscrollable?: boolean;
    centered?: boolean;
    itemWidth?: number;
    itemHeight?: number;
    autoScroll?: boolean;
    autoScrollRatio?: number;
    swipeable?: boolean;
    disabled?: boolean;
    index?: number;
    autoRefresh?: boolean;
    onPostChange?(event: CarouselPostChangeEvent): void;
    onRefresh?(event: CarouselBaseEvent): void;
    onOverscroll?(event: CarouselOverscrollEvent): void;
    animationOptions?: AnimationOptions;
  } & HTMLProps<any>,
  any
> {}

export class CarouselItem extends Component<
  {
    modifier?: string;
  } & HTMLProps<any>,
  any
> {}

/*** AlertDialog ***/

export interface AlertDialogPreEvent extends Event {
  alertDialog: AlertDialog;
  cancel(): void;
}

export interface AlertDialogPostEvent extends Event {
  cancel(): void;
}

export class AlertDialog extends Component<
  {
    onCancel?(): void;
    isOpen?: boolean;
    isCancelable?: boolean;
    isDisabled?: boolean;
    animation?: "none" | "default";
    modifier?: string;
    maskColor?: string;
    animationOptions?: AnimationOptions;
    onPreShow?(event?: AlertDialogPreEvent): void;
    onPostShow?(event?: AlertDialogPostEvent): void;
    onPreHide?(event?: AlertDialogPreEvent): void;
    onPostHide?(event?: AlertDialogPostEvent): void;
    onDeviceBackButton?(): void;
  } & HTMLProps<any>,
  any
> {}

export interface DialogPreEvent extends Event {
  dialog: Dialog;
  cancel(): void;
}

export interface DialogPostEvent extends Event {
  cancel(): void;
}

export class Dialog extends Component<
  {
    onCancel?(): void;
    isOpen?: boolean;
    isCancelable?: boolean;
    isDisabled?: boolean;
    animation?: "none" | "default";
    modifier?: string;
    maskColor?: string;
    animationOptions?: AnimationOptions;
    onPreShow?(event?: DialogPreEvent): void;
    onPostShow?(event?: DialogPostEvent): void;
    onPreHide?(event?: DialogPreEvent): void;
    onPostHide?(event?: DialogPostEvent): void;
    onDeviceBackButton?(): void;
  } & HTMLProps<any>,
  any
> {}

export interface ModalPreEvent extends Event {
  modal: Modal;
  cancel(): void;
}

export interface ModalPostEvent extends Event {
  cancel(): void;
}

export class Modal extends Component<
  {
    animation?: "fade" | "none";
    animationOptions?: AnimationOptions;
    onPreShow?(event?: ModalPreEvent): void;
    onPostShow?(event?: ModalPostEvent): void;
    onPreHide?(event?: ModalPreEvent): void;
    onPostHide?(event?: ModalPostEvent): void;
    isOpen?: boolean;
    onDeviceBackButton?(): void;
  } & HTMLProps<any>,
  any
> {}

export interface PopoverBaseEvent extends Event {
  popover: any;
}

export interface PopoverPreEvent extends PopoverBaseEvent {
  cancel(): void;
}

export class Popover extends Component<
  {
    getTarget?(): Component<any> | HTMLElement | ReactInstance;
    onCancel?(): void;
    isOpen?: boolean;
    isCancelable?: boolean;
    isDisabled?: boolean;
    animation?: "none" | "default" | "fade-ios" | "fade-md";
    modifier?: string;
    maskColor?: string;
    animationOptions?: AnimationOptions;
    onPreShow?(event: PopoverPreEvent): void;
    onPostShow?(event: PopoverBaseEvent): void;
    onPreHide?(event: PopoverPreEvent): void;
    onPostHide?(event: PopoverBaseEvent): void;
    onDeviceBackButton?(): void;
  } & HTMLProps<any>,
  any
> {}

export class Toast extends Component<
  {
    isOpen: boolean;
    animation?: "default" | "ascend" | "lift" | "fall" | "fade" | "none" | string;
    modifier?: string;
    animationOptions?: AnimationOptions;
    onPreShow?(event?: Event): void;
    onPostShow?(event?: Event): void;
    onPreHids?(event?: Event): void;
    onPostHide?(event?: Event): void;
    onDeviceBackButton?(): void;
  } & HTMLProps<any>,
  any
> {}

/**
 * ActionSheet
 */
export interface ActionSheetBaseEvent extends Event {
  cancel(): void;
}

export interface ActionSheetPreEvent extends ActionSheetBaseEvent {
  actionSheet: ActionSheet;
  cancel(): void;
}

export class ActionSheet extends Component<
  {
    onCancel?(): void;
    isOpen: boolean;
    isCancelable?: boolean;
    isDisabled?: boolean;
    animation?: string;
    modifier?: string;
    maskColor?: string;
    animationOptions?: AnimationOptions;
    onPreShow?(event?: ActionSheetPreEvent): void;
    onPostShow?(event?: ActionSheetBaseEvent): void;
    onPreHide?(event?: ActionSheetPreEvent): void;
    onPostHide?(event?: ActionSheetBaseEvent): void;
    onDeviceBackButton?(): void;
  } & HTMLProps<any>,
  any
> {}

export class ActionSheetButton extends Component<
  {
    modifier?: string;
    icon?: string;
    onClick(event?: MouseEvent<HTMLElement>): void;
  } & HTMLProps<any>,
  any
> {}

export class ProgressBar extends Component<
  {
    modifier?: string;
    value?: number;
    secondaryValue?: number;
    indeterminate?: boolean;
  } & HTMLProps<any>,
  any
> {}

export class ProgressCircular extends Component<
  {
    modifier?: string;
    value?: number;
    secondaryValue?: number;
    indeterminate?: boolean;
  } & HTMLProps<any>,
  any
> {}

export class Ripple extends Component<
  {
    color?: string;
    background?: string;
    disabled?: boolean;
  } & HTMLProps<any>,
  any
> {}

export class Card extends Component<
  {
    modifier?: string;
  } & HTMLProps<any>,
  any
> {}

/*** Forms ***/
export class Fab extends Component<
  {
    modifier?: string;
    ripple?: boolean;
    position?: string;
    disabled?: boolean;
    onClick?(event?: MouseEvent<HTMLElement>): void;
  } & HTMLProps<any>,
  any
> {}

export class Button extends Component<
  {
    modifier?: string;
    disabled?: boolean;
    ripple?: boolean;
    onClick?(event?: MouseEvent<HTMLElement>): void;
  } & HTMLProps<any>,
  any
> {}

export class Checkbox extends Component<
  {
    modifier?: string;
    disabled?: boolean;
    onChange?(event?: Event): void;
    value?: string;
    checked?: boolean;
    inputId?: string;
  } & HTMLProps<any>,
  any
> {}

export class Input extends Component<
  {
    modifier?: string;
    disabled?: boolean;
    onChange?(event: ChangeEvent<any>): void;
    value?: string;
    placeholder?: string;
    type?: string;
    inputId?: string;
    float?: boolean;
    readonly?: boolean;
  } & HTMLProps<any>,
  any
> {}

export class Range extends Component<
  {
    modifier?: string;
    onChange?(event: Event): void;
    value?: number;
    disabled?: boolean;
  } & HTMLProps<any>,
  any
> {}

export interface SwitchChangeEvent extends FormEvent<any> {
  switch: Switch;
  value: boolean;
  isInteractive: boolean;
}

export class Switch extends Component<
  {
    onChange?(event: SwitchChangeEvent): void;
    checked?: boolean;
    disabled?: boolean;
    inputId?: string;
  } & HTMLProps<any>,
  any
> {}

export class Radio extends Component<
  {
    modifier?: string;
    disabled?: string;
    onChange?(event: Event): void;
    value?: string;
    checked?: boolean;
    inputId?: string;
  } & HTMLProps<any>,
  any
> {}

export class SearchInput extends Component<
  {
    modifier?: string;
    disabled?: boolean;
    onChange?(event: Event): void;
    value?: string;
    inputId?: string;
  } & HTMLProps<any>,
  any
> {}

export class Select extends Component<
  {
    modifier?: string;
    disabled?: boolean;
    onChange?(event: Event): void;
    value?: string;
    multiple?: boolean;
    autofocus?: boolean;
    required?: boolean;
    form?: string;
    size?: string;
  } & HTMLProps<any>,
  any
> {}

/**
 * Tabs
 */

export class Tab extends Component<
  {
    label?: string;
    badge?: string;
    icon?: string;
    activeIcon?: string;
  } & HTMLProps<any>
> {}

export class TabActive extends Tab {}

export class TabInactive extends Tab {}

export interface TabbarBaseEvent extends Event {
  index: number;
  tabItem: any;
}

export interface TabbarPreEvent extends TabbarBaseEvent {
  cancel(): void;
  activeIndex: number;
  lastActiveIndex: number;
}

export class Tabbar extends Component<
  {
    index?: number;
    renderTabs?(): { content: JSX.Element | HTMLElement; tab: JSX.Element | HTMLElement }[];
    position?: "bottom" | "top" | "auto";
    swipeable?: boolean;
    ignoreEdgeWidth?: number;
    animation?: "none";
    animationOptions?: AnimationOptions;
    tabBorder?: boolean;
    onPreChange?(event?: TabbarPreEvent): void;
    onPostChange?(event?: TabbarBaseEvent): void;
    onReactive?(event?: TabbarBaseEvent): void;
    onSwipe?(index: number, animationOptions: AnimationOptions): void;
  } & HTMLProps<any>,
  any
> {}

/**
 * Lists
 */

export class LazyList extends Component<
  {
    modifier?: string;
    length: number;
    renderRow(rowIndex: number): any;
    calculateItemHeight(rowIndex: number, ...objs: any[]): number;
  } & HTMLProps<any>,
  any
> {}

export class List extends Component<
  {
    modifier?: string;
    dataSource?: any[];
    renderRow?(row?: any, index?: number): JSX.Element | HTMLElement;
    renderHeader?(): JSX.Element | HTMLElement;
    renderFooter?(): JSX.Element | HTMLElement;
  } & HTMLProps<any>,
  any
> {}

export class ListHeader extends Component<
  {
    modifier?: string;
  } & HTMLProps<any>,
  any
> {}

export class ListItem extends Component<
  {
    modifier?: string;
    tappable?: boolean;
    tapBackgroundColor?: string;
    lockOnDrag?: boolean;
    onClick?(event?: React.MouseEventHandler<any>): void;
  } & HTMLProps<any>,
  any
> {}

export class ListTitle extends Component<
  {
    modifier?: string;
    onClick?(event?: React.MouseEventHandler<any>): void;
  } & HTMLProps<any>,
  any
> {}

/**
 * Control
 */

export interface PullHookChangeEvent extends Event {
  pullHook: PullHook;
  state: "initial" | "preaction" | "action";
}

export class PullHook extends Component<
  {
    onChange?(event: PullHookChangeEvent): void;
    onLoad?(done: () => void): void;
    onPull?(): void;
    disabled?: boolean;
    height?: number;
    thresholdHeight?: number;
    fixedContent?: boolean;
  } & HTMLProps<any>,
  any
> {}

export class Segment extends Component<
  {
    index?: number;
    tabbarId?: string;
    modifier?: string;
    onChange?(): void;
  } & HTMLProps<any>,
  any
> {}

export class SpeedDial extends Component<
  {
    modifier?: string;
    position?: "right" | "left" | "top" | "bottom";
    direction?: "up" | "down" | "left" | "right";
    disabled?: string;
  } & HTMLProps<any>,
  any
> {}

export class SpeedDialItem extends Component<
  {
    modifier?: string;
    onClick?(event?: MouseEvent<HTMLElement>): void;
  } & HTMLProps<any>,
  any
> {}
