import React from "react";
import { Key } from "./interface";
import ListItem, { ListItemProps } from "src/components/core/ListItem";
import { MenuContext } from "./Menu";
import { makeStyles, Theme, createStyles } from "src/components/core/styles";
import classNames from "classnames";
import Popover from "src/components/core/Popover";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuItem: {
      color: "#6c757d",
      padding: "15px 30px",
      position: "relative",
      transition: "all .4s",
      whiteSpace: "nowrap",
      cursor: "pointer",
      "& svg": {
        margin: "0 10px 0 3px",
        width: 20,
        height: 20,
      },
      "&:hover": {
        color: "#727cf5",
      },
    },
    collapsed: {
      padding: "15px 20px",
      minHeight: 56,
      "& svg": {
        marginRight: "20px",
      },
    },
    active: {
      color: "#727cf5",
    },
  })
);
export interface MenuItemProps<T = Key>
  extends Omit<ListItemProps, "onSelect" | "prefix"> {
  eventKey?: T;

  disabled?: boolean;

  divider?: boolean;

  active?: boolean;

  icon?: React.ReactElement;

  hasPopover?: boolean;

  onSelect?: (eventKey: T, event: React.SyntheticEvent) => void;

  onItemHover?: (child: any) => void;
}

const defaultProps: Partial<MenuItemProps> = {
  active: false,
};

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const {
    disabled,
    divider,
    eventKey,
    icon,
    children,
    onSelect,
    onClick,
    active,
    hasPopover,
  } = props;

  const classes = useStyles();

  const { expanded } = React.useContext(MenuContext);

  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      if (!disabled) {
        onSelect?.(eventKey, event);
        onClick?.(event);
      }
    },
    [disabled, eventKey, onClick, onSelect]
  );

  const handleMouseEnter = React.useCallback(
    (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {},
    []
  );
  const item = (
    <ListItem
      disableGutters
      disabled={disabled}
      divider={divider}
      button={false}
      className={classNames({
        [classes.menuItem]: true,
        [classes.collapsed]: !expanded,
        [classes.active]: active,
      })}
    >
      {icon}
      {expanded && children}
    </ListItem>
  );
  return (
    <ListItem
      disableGutters
      disabled={disabled}
      divider={divider}
      button={false}
      className={classNames({
        [classes.menuItem]: true,
        [classes.collapsed]: !expanded,
        [classes.active]: active,
      })}
    >
      {icon}
      {expanded && children}
    </ListItem>
  );
};

MenuItem.displayName = "MenuItem";
MenuItem.defaultProps = defaultProps;

export default MenuItem;
