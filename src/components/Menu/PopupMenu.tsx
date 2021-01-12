import React from "react";
import { WithComponentProps, RefForwardingComponent } from "src/@types/common";
import Popover from "src/components/core/Popover";
import { SelectEventHandler, MenuClickEventHandler } from "./interface";
import List from "src/components/core/List";
import { equals } from "ramda";

export interface PopupMenuProps<T = string> extends WithComponentProps {
  /** Whether the menu is in the folded state */
  collapsed?: boolean;

  /** Whether multiple selections are allowed */
  multiple?: boolean;

  /** Define menu indent width */
  indent?: number;

  /** Define the layer number of menu */
  level?: number;

  /** Is it allowed to select */
  selectable?: boolean;

  /** Whether to keep only one submenu open */
  uniqueOpened?: boolean;

  /** Submenu expand whether to activate the first */
  defaultActiveFirst?: boolean;

  /** Define the initial selected Submenu EventKey */
  defaultOpenKeys?: T[];

  /** Defines the currently expanded Submenu EventKey */
  openKeys?: T[];

  /** Define the initial selected MenuItem EventKey */
  defaultSelectedKeys?: T[];

  /** Defines the currently expanded MenuItem EventKey */
  selectedKeys?: T[];

  /** Defines the currently active menu item */
  activeKey?: T;

  /** called when open/close submenu */
  onOpenChange?: (openKeys: T[], event: React.SyntheticEvent) => void;

  /** called when select a menuitem */
  onSelect?: SelectEventHandler<T>;

  /** called when deselect a menu item. only called when allow multiple */
  onDeselect?: SelectEventHandler<T>;

  /** called when click a menu item */
  onClick?: MenuClickEventHandler<T>;
}

const defaultProps: Partial<PopupMenuProps> = {
  component: List,
  prefixClass: "popup-menu",
  level: 1,
  indent: 16,
};

const PopupMenu: RefForwardingComponent<
  typeof List,
  PopupMenuProps
> = React.forwardRef((props: PopupMenuProps, ref: React.Ref<HTMLLIElement>) => {
  const { component: Component, children } = props;

  return <Component>{children}</Component>;
});

PopupMenu.displayName = "PopupMenu";
PopupMenu.defaultProps = defaultProps;

export default React.memo(PopupMenu);
