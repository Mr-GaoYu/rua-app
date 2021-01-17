import React from "react";
import useControlled from "src/hooks/useControlled";
import { makeStyles, createStyles, Theme } from "src/components/core/styles";
import MenuBody from "./MenuBody";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menu: {
      minWidth: 250,
      maxWidth: 250,
      zIndex: 10,
      position: "relative",
      backgroundColor: "#ffffff",
      boxShadow: "0 0 35px 0 rgba(154,161,171,.15)",
      border: "1px solid red",
      padding: 0,
      margin: 0,
    },
    collapse: {
      minWidth: 70,
      maxWidth: 70,
      zIndex: 5,
    },
  })
);

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
}

export const MenuContext = React.createContext(null);

export interface MenuContextType {
  openKeys?: string[];
  selectedKeys?: string[];
}

const defaultProps: Partial<MenuProps> = {};

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
    children,
    activeKey,
  } = props;
  const classes = useStyles();

  const [selectedKeys, setSelectedKeys] = useControlled(
    selectedKeysProp,
    defaultSelectedKeys
  );
  const [openKeys, setOpenKeys] = useControlled(openKeysProp, defaultOpenKeys);

  const handleSelect = React.useCallback(
    (eventKey: string, event: React.MouseEvent) => {
      if (selectable) {
        let nextSelectKeys = [...selectedKeys];
        if (multiple) {
          nextSelectKeys.push(eventKey);
        } else {
          nextSelectKeys = [eventKey];
        }

        setSelectedKeys(nextSelectKeys);
        onSelect?.(event, eventKey, nextSelectKeys);
      }
    },
    [multiple, onSelect, selectable, selectedKeys, setSelectedKeys]
  );

  const handleDeselect = React.useCallback(
    (eventKey: string, event: React.MouseEvent) => {
      if (selectable) {
        let nextSelectKeys = [...selectedKeys];
        const index = nextSelectKeys.indexOf(eventKey);

        if (index !== -1) {
          selectedKeys.splice(index, 1);
        }

        setSelectedKeys(nextSelectKeys);
        onDeselect?.(event, eventKey, nextSelectKeys);
      }
    },
    [onDeselect, selectable, selectedKeys, setSelectedKeys]
  );

  const handleClick = React.useCallback(
    (eventKey: string) => {
      onClick?.(eventKey);
    },
    [onClick]
  );

  const handleOpenChange = React.useCallback(() => {}, []);

  const handleMouseEnter = React.useCallback(() => {}, []);

  const handleMouseLeave = React.useCallback(() => {}, []);

  const contextValue = {
    selectedKeys,
    openKeys,
    activeKey,
    collapse,
  };

  return (
    <MenuContext.Provider value={contextValue}>
      <MenuBody {...props}>{children}</MenuBody>
    </MenuContext.Provider>
  );
};

Menu.defaultProps = defaultProps;
Menu.displayName = "Menu";

export default Menu;
