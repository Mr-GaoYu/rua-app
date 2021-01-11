import React from "react";
import List from "src/components/core/List";
import PropTypes from "prop-types";
import { WithComponentProps, RefForwardingComponent } from "src/@types/common";
import useControlled from "src/hooks/useControlled";
import { cloneElement } from "src/utilities/ReactChildren";
import { equals } from "ramda";

export interface MenuProps<T = string> extends WithComponentProps {
  /** Whether the menu is in the folded state */
  collapsed?: boolean;

  /** Whether multiple selections are allowed */
  multiple?: boolean;

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

  onOpenChange?: (openKeys: T[], event: React.SyntheticEvent) => void;

  onSelect?: (eventKey: T[], event: React.SyntheticEvent) => void;

  onDeselect?: (eventKey: T, event: React.SyntheticEvent) => void;

  onClick?: (eventKey: T, event: React.SyntheticEvent) => void;

  onDestroy?: (key: React.Key) => void;
}

export interface MenuContextType<T = string> {
  selectedKeys?: T[];
  openKeys?: T[];
  collapsed?: boolean;
  onOpenChange?: (openKeys: T, event: React.SyntheticEvent) => void;
  onSelect?: (eventKey: T, event: React.SyntheticEvent) => void;
}

export const MenuContext = React.createContext(null);

const defaultProps: Partial<MenuProps> = {
  component: List,
  prefixClass: "menu",
  selectable: true,
  defaultOpenKeys: [],
  defaultSelectedKeys: [],
  className: "",
  style: {},
};

const Menu: RefForwardingComponent<typeof List, MenuProps> = React.forwardRef(
  (props: MenuProps, ref: React.Ref<HTMLLIElement>) => {
    const {
      component: Component,
      openKeys: openKeysProp,
      defaultOpenKeys,
      selectedKeys: selectedKeysProps,
      defaultSelectedKeys,
      collapsed,
      selectable,
      multiple,
      uniqueOpened,
      onOpenChange,
      onSelect,
      onClick,
      onDeselect,
      onDestroy,
      children,
      activeKey,
      ...rest
    } = props;

    const [openKeys, setOpenKeys] = useControlled(
      openKeysProp,
      defaultOpenKeys
    );
    const [selectedKeys, setSelectedKeys] = useControlled(
      selectedKeysProps,
      defaultSelectedKeys
    );

    const handleOpenChange = React.useCallback(
      (eventKey: string, event: React.MouseEvent) => {
        let nextOpenKeys = [...openKeys];
        if (uniqueOpened) {
          nextOpenKeys = nextOpenKeys.concat([eventKey]);
        } else {
          nextOpenKeys = [eventKey];
        }

        setOpenKeys(nextOpenKeys);
        onOpenChange?.(nextOpenKeys, event);
      },
      [onOpenChange, openKeys, setOpenKeys]
    );

    const handleSelect = React.useCallback(
      (eventKey: string, event: React.MouseEvent) => {
        if (selectable) {
          let nextSelectedKeys = [...selectedKeys];
          if (multiple) {
            nextSelectedKeys = nextSelectedKeys.concat([eventKey]);
          } else {
            nextSelectedKeys = [eventKey];
          }
          setSelectedKeys(nextSelectedKeys);
          onSelect?.(nextSelectedKeys, event);
        }
      },
      [onSelect, selectedKeys, setSelectedKeys]
    );

    const popupMenu = cloneElement(children, (item) => {
      const { eventKey, active, ...rest } = item.props;
      const displayName = item?.type?.displayName;

      if (displayName === "MenuItem") {
        return {
          ...rest,
          isSelected: selectedKeys.indexOf(eventKey) !== -1,
          active:
            typeof activeKey === "undefined"
              ? active
              : equals(activeKey, eventKey),
        };
      }

      if (displayName === "SubMenu") {
          return {
              ...rest,
              
          }
      }

      return null;
    });

    const contextValue = React.useMemo(
      () => ({
        collapsed,
        selectedKeys,
        openKeys,
        onOpenChange: handleOpenChange,
        onSelect: handleSelect,
      }),
      [collapsed, handleSelect, selectedKeys, handleOpenChange, openKeys]
    );

    return (
      <MenuContext.Provider value={contextValue}>
        <Component {...rest}>{popupMenu}</Component>
      </MenuContext.Provider>
    );
  }
);

Menu.displayName = "Menu";
Menu.defaultProps = defaultProps;
Menu.propTypes = {
  component: PropTypes.elementType,
};

export default Menu;
