import React from "react";
import { Key } from "./interface";
import List from "src/components/core/List";
import { makeStyles, Theme, createStyles } from "src/components/core/styles";
import classNames from "classnames";
import Popover from "src/components/core/Popover";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menu: {
      width: 250,
      zIndex: 10,
      backgroundColor: "#ffffff",
      position: "relative",
      transition: theme.transitions.create("all"),
      boxShadow: "0 0 35px 0 rgba(154,161,171,.15)",
    },
    collapsed: {
      width: 70,
    },
  })
);

export interface MenuProps<T = Key> {
  expanded?: boolean;

  defaultOpenKeys?: T[];

  openKeys?: T[];

  activeKey?: T;

  onOpenChange?: (openKeys: T[], event: React.SyntheticEvent) => void;

  onSelect?: (eventKey: T, event: React.SyntheticEvent) => void;

  style?: React.CSSProperties;

  className?: string;
}

export interface MenuContextType<T = Key> {
  openKeys: T[];
  expanded: boolean;
  onOpenChange: (openKeys: T[], event: React.SyntheticEvent) => void;
}

export const MenuContext = React.createContext<MenuContextType>(null);

const defaultProps: Partial<MenuProps> = {
  expanded: true,
  defaultOpenKeys: [],
};

const Menu: React.FC<MenuProps> = (props) => {
  const {
    expanded,
    style,
    onOpenChange,
    className,
    openKeys,
    children,
  } = props;
  const classes = useStyles();

  const contextValue = React.useMemo(
    () => ({
      openKeys,
      expanded,
      onOpenChange,
    }),
    [expanded, onOpenChange, openKeys]
  );

  return (
    <MenuContext.Provider value={contextValue}>
      <List
        disablePadding
        className={classNames(className, {
          [classes.menu]: true,
          [classes.collapsed]: !expanded,
        })}
        style={style}
      >
        {children}
      </List>
    </MenuContext.Provider>
  );
};

Menu.displayName = "Menu";
Menu.defaultProps = defaultProps;

export default Menu;
