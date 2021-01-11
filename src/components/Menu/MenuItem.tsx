import React from "react";
import { WithComponentProps, RefForwardingComponent } from "src/@types/common";
import ListItem from "src/components/core/ListItem";
import { createStyles, makeStyles, Theme } from "src/components/core/styles";
import classNames from "classnames";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuItem: {
      padding: "15px 30px",
      transition: theme.transitions.create(["all"]),
      backgroundColor: "transparent",
      color: '#6c757d',
      "& svg": {
        width: 20,
        height: 20,
        margin: "0 10px 0 3px",
      },
    },
  })
);
export interface MenuItemProps<T = string>
  extends WithComponentProps,
    Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
  /** The value of the current option */
  eventKey?: T;

  /** Diabled status */
  disabled?: boolean;

  /** Define menu indent width */
  indent?: number;

  /** Define the layer number of menu */
  level?: number;

  /** Define menuitem icon */
  icon?: React.ReactElement;

  button?: boolean;

  role?: string;
  multiple?: boolean;
  isSelected?: boolean;
  divider?: boolean;
  active?: boolean;
  onSelect?: (eventKey: T, event: React.SyntheticEvent) => void;
}

const defaultProps: Partial<MenuItemProps> = {
  component: ListItem,
  prefixClass: "menu-item",
  button: false,
};

const MenuItem: RefForwardingComponent<
  typeof ListItem,
  MenuItemProps
> = React.forwardRef((props: MenuItemProps, ref: React.Ref<HTMLLIElement>) => {
  const {
    component: Component,
    onClick,
    onSelect,
    disabled,
    eventKey,
    icon,
    children,
    style,
    button,
    className,
    ...rest
  } = props;

  const classes = useStyles();

  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (!disabled) {
        onSelect?.(eventKey, event);
        onClick?.(event);
      }
    },
    [disabled, onSelect, eventKey, onClick]
  );

  return (
    <Component
      {...rest}
      onClick={handleClick}
      ref={ref}
      style={style}
      disableGutters
      className={classNames(className, {
        [classes.menuItem]: true,
      })}
    >
      {icon}
      {children}
    </Component>
  );
});

MenuItem.displayName = "MenuItem";
MenuItem.defaultProps = defaultProps;

export default MenuItem;
