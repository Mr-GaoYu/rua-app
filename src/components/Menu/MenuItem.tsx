import React from "react";
import { WithComponentProps, RefForwardingComponent } from "src/@types/common";
import ListItem from "src/components/core/ListItem";
import { createStyles, makeStyles, Theme } from "src/components/core/styles";
import classNames from "classnames";
import {
  SelectEventHandler,
  MenuClickEventHandler,
  MenuHoverEventHandler,
} from "./interface";
import { MenuContext, MenuContextType } from "./Menu";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuItem: {
      padding: "15px 30px",
      transition: theme.transitions.create(["all"]),
      backgroundColor: "transparent",
      color: "#6c757d",
      cursor: "pointer",
      "& svg": {
        width: 20,
        height: 20,
        margin: "0 10px 0 3px",
      },
      "&:hover": {
        color: " #727cf5",
      },
    },
    active: {
      color: " #727cf5",
    },
    selected: {},
    disabled: {},
  })
);
export interface MenuItemProps<T = string>
  extends WithComponentProps,
    Omit<
      React.HTMLAttributes<HTMLElement>,
      "onSelect" | "onClick" | "onMouseEnter" | "onMouseLeave"
    > {
  /** The value of the current option */
  eventKey: T;

  /** Diabled status */
  disabled?: boolean;

  /** Define menu indent width */
  indent?: number;

  /** Define the layer number of menu */
  level?: number;

  /** Define menuitem icon */
  expandIcon?: React.ReactElement;

  /** If true, the list item will be a button (using ButtonBase).
   * Props intended for ButtonBase can then be applied to ListItem. */
  button?: boolean;

   /** Whether multiple selections are allowed */
  multiple?: boolean;

  /** Whether to be selected or not */
  isSelected?: boolean;

  /** If true, a 1px light border is added to the bottom of the list item. */
  divider?: boolean;

  /** Whether it's activated or not */
  active?: boolean;


  onSelect?: SelectEventHandler<T>;
  onDeselect?: SelectEventHandler<T>;
  onClick?: MenuClickEventHandler<T>;
  onMouseEnter?: MenuHoverEventHandler<T>;
  onMouseLeave?: MenuHoverEventHandler<T>;
}

const defaultProps: Partial<MenuItemProps> = {
  component: ListItem,
  prefixClass: "menu-item",
  button: false,
  level: 1,
  indent: 16,
};

const MenuItem: RefForwardingComponent<
  typeof ListItem,
  MenuItemProps
> = React.forwardRef((props: MenuItemProps, ref: React.Ref<HTMLLIElement>) => {
  const {
    component: Component,
    prefixClass,
    onClick,
    onSelect,
    onDeselect,
    onMouseEnter,
    onMouseLeave,
    disabled,
    eventKey,
    isSelected,
    expandIcon,
    children,
    multiple,
    active,
    ...rest
  } = props;

  const { selectedKeys } = React.useContext<MenuContextType>(MenuContext);

  const classes = useStyles();

  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      onClick?.(eventKey, event);

      if (multiple) {
        if (isSelected) {
          onDeselect(eventKey, event);
        } else {
          onSelect?.(eventKey, event);
        }
      } else if (!isSelected) {
        onSelect?.(eventKey, event);
      }
    },
    [onClick, eventKey, multiple, isSelected, onDeselect, onSelect]
  );

  const handleMouseLeave = React.useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      onMouseEnter?.(eventKey, event);
    },
    [eventKey, onMouseEnter]
  );

  const handleMouseEnter = React.useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      onMouseEnter?.(eventKey, event);
    },
    [eventKey, onMouseEnter]
  );


  const mouseEvent = {
    onClick: disabled ? null : handleClick,
    onMouseLeave: disabled ? null : handleMouseLeave,
    onMouseEnter: disabled ? null : handleMouseEnter,
  };

  const className = classNames({
    [classes.menuItem]: true,
    [classes.active]: active,
    [classes.selected]: selectedKeys.indexOf(eventKey) !== -1,
    [classes.disabled]: disabled,
  });

  const style = {
    ...props.style,
  };

  style.paddingLeft = props.indent * props.level;

  return (
    <Component
      {...rest}
      {...mouseEvent}
      ref={ref}
      style={style}
      disableGutters
      className={className}
    >
      {expandIcon}
      {children}
    </Component>
  );
});

MenuItem.displayName = "MenuItem";
MenuItem.defaultProps = defaultProps;

export default MenuItem;
