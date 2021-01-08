import React from "react";
import MenuContext from "./MenuContext";
import SubPopupMenu from "./SubPopupMenu";
import {
  MenuClickEventHandler,
  SelectInfo,
  SelectEventHandler,
} from "./interface";
import { noop } from "./utils";
import List from "src/components/core/List";
import classNames from "classnames";
import { makeStyles, createStyles, Theme } from "src/components/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menu: {
      minWidth: 250,
      maxWidth: 250,
      zIndex: 10,
      backgroundColor: "#ffffff",
      position: "relative",
      boxShadow: "0 0 35px 0 rgba(154,161,171,.15)",
      transition: theme.transitions.create(["all"]),
    },
    collapsed: {
      minWidth: 70,
      maxWidth: 70,
      zIndex: 5,
      paddingTop: 0,
    },
  })
);

export interface MenuProps {
  openKeys?: string[];
  selectedKeys?: React.Key[];
  onOpenChange?: (openKeys: React.Key[]) => void;
  onSelect?: SelectEventHandler;
  onClick?: MenuClickEventHandler;
  onDeselect?: SelectEventHandler;
  selectable?: boolean;
  defaultSelectedKeys?: string[];
  defaultOpenKeys?: string[];
  multiple?: boolean;
  collapsed?: boolean;
  indent?: number;
  uniqueOpened?: boolean;
  activeKey?: string;
  defaultActiveFirst?: boolean;
  style?: React.CSSProperties;
}

const Menu: React.FC<MenuProps> = (props) => {
  const { collapsed, children } = props;
  const classes = useStyles();


  console.log(children,22)
  return (
    <MenuContext.Provider value={{
      collapsed
    }}>
      <List
        disablePadding={true}
        className={classNames({
          [classes.menu]: true,
          [classes.collapsed]: collapsed,
        })}
      >
        {children}
      </List>
    </MenuContext.Provider>
  );
};

Menu.defaultProps = {
  defaultSelectedKeys: [],
  defaultOpenKeys: [],
};

export default Menu;
