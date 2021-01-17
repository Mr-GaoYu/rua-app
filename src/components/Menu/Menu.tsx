import React from "react";

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
}

export const MenuContext = React.createContext(null);

export interface MenuContextType {
  openKeys?: string[];
  selectedKeys?: string[];
}

const defaultProps: Partial<MenuProps> = {};

const Menu: React.FC<MenuProps> = (props: MenuProps) => {
  const { collapse, children, selectedKeys, openKeys, activeKey } = props;
  const classes = useStyles();

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
