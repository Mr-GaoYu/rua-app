import React from "react";
import useControlled from "src/hooks/useControlled";
import MenuBody from "./MenuBody";
import { equals } from "ramda";

export interface MenuProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onClick" | "onSelect"> {
  collapse?: boolean;

  defaultSelectedKeys?: string[];

  selectedKeys?: string[];

  defaultOpenKeys?: string[];

  openKeys?: string[];

  defaultActiveFirst?: boolean;

  activeKey?: string;

  uniqueOpened?: boolean;

  collapsedWidth?: string | number;

  selectable?: boolean;

  multiple?: boolean;

  level?: number;

  onSelect?: (
    event: React.MouseEvent,
    eventKey: string,
    selectKeys: string[]
  ) => void;

  onClick?: (eventKey: string) => void;

  onDeselect?: (
    event: React.MouseEvent,
    eventKey: string,
    selectKeys: string[]
  ) => void;

  onOpenChange?: (openKeys: string[], event: React.SyntheticEvent) => void;
}

export const MenuContext = React.createContext(null);

export interface MenuContextType {
  openKeys?: string[];
  selectedKeys?: string[];
}

const defaultProps: Partial<MenuProps> = {
  defaultSelectedKeys: [],
  defaultOpenKeys: [],
  selectable: true,
  collapse: true,
};

const Menu: React.FC<MenuProps> = (props: MenuProps) => {
  const {
    selectedKeys: selectedKeysProp,
    defaultSelectedKeys,
    openKeys: openKeysProp,
    defaultOpenKeys,
    collapse,
    selectable,
    multiple,
    onSelect,
    onDeselect,
    onClick,
    onOpenChange,
    uniqueOpened,
    children,
    activeKey,
  } = props;

  const [selectedKeys, setSelectedKeys] = useControlled(
    selectedKeysProp,
    defaultSelectedKeys
  );
  const [openKeys, setOpenKeys] = useControlled(openKeysProp, defaultOpenKeys);

  const handleSelect = React.useCallback(
    (eventKey: string, event: React.MouseEvent) => {
      if (selectable) {
        let nextSelectedKeys = [...selectedKeys];
        if (multiple) {
          nextSelectedKeys.push(eventKey);
        } else {
          nextSelectedKeys = [eventKey];
        }
        setSelectedKeys(nextSelectedKeys);
        onSelect?.(event, eventKey, nextSelectedKeys);
      }
    },
    [multiple, onSelect, selectable, selectedKeys, setSelectedKeys]
  );

  const handleDeselect = React.useCallback(
    (eventKey: string, event: React.MouseEvent) => {
      if (selectable) {
        let nextSelectedKeys = [...selectedKeys];
        const index = nextSelectedKeys.indexOf(eventKey);

        if (index !== -1) {
          selectedKeys.splice(index, 1);
        }
        setSelectedKeys(nextSelectedKeys);
        onDeselect?.(event, eventKey, nextSelectedKeys);
      }
    },
    [onDeselect, selectable, selectedKeys, setSelectedKeys]
  );

  const handleOpen = React.useCallback(
    (eventKey: string, event: React.MouseEvent) => {
      let nextOpenKeys = [...openKeys];
      if (uniqueOpened) {
        nextOpenKeys = [eventKey];
      } else {
        nextOpenKeys.push(eventKey);
      }
      setOpenKeys(nextOpenKeys);
      onOpenChange?.(nextOpenKeys, event);
    },
    [onOpenChange, openKeys, setOpenKeys, uniqueOpened]
  );

  const handleClose = React.useCallback(
    (eventKey: string, event: React.MouseEvent) => {
      let nextOpenKeys = [...openKeys];
      const index = nextOpenKeys.indexOf(eventKey);

      if (index !== -1) {
        nextOpenKeys.splice(index, 1);
      }

      setOpenKeys(nextOpenKeys);
      onOpenChange?.(nextOpenKeys, event);
    },
    [onOpenChange, openKeys, setOpenKeys]
  );

  const handleClick = React.useCallback(
    (eventKey: string, event: React.MouseEvent) => {
      onClick?.(eventKey);
    },
    [onClick]
  );

  const handleOpenChange = React.useCallback(
    (eventKey: string, event: React.MouseEvent) => {
      const find = (key) => equals(eventKey, key);
      const nextOpenKeys = [...openKeys];
      if (nextOpenKeys.some(find)) {
        handleClose(eventKey, event);
      } else {
        handleOpen(eventKey, event);
      }
    },
    [handleClose, handleOpen, openKeys]
  );

  const handleMouseEnter = React.useCallback(() => {}, []);

  const handleMouseLeave = React.useCallback(() => {}, []);

  const event = {
    onClick: handleClick,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onSelect: handleSelect,
    onDeselect: handleDeselect,
    onOpenChange: handleOpenChange,
  };

  const contextValue = {
    selectedKeys,
    openKeys,
    activeKey,
    collapse,
  };

  return (
    <MenuContext.Provider value={contextValue}>
      {selectedKeys}
      <MenuBody {...props} {...event} />
    </MenuContext.Provider>
  );
};

Menu.defaultProps = defaultProps;
Menu.displayName = "Menu";

export default Menu;
