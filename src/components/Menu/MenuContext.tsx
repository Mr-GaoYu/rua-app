import React from "react";

export interface MenuContextProps {
  openKeys?: string[];
  selectedKeys?: React.Key[];
  collapsed?: boolean;
}

const MenuContext = React.createContext<MenuContextProps>({});

export default MenuContext;
