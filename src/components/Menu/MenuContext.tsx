import React from "react";

export interface MenuContextProps {
  openKeys?: string[];
  selectedKeys?: React.Key[];
}

const MenuContext = React.createContext<MenuContextProps>({});

export default MenuContext;
