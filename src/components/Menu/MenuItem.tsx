import React from "react";
import { RefForwardingComponent, WithComponentProps } from "src/@types/common";
import classNames from "classnames";
import useStyles from "./Menu.styles";
import SafeAnchor from "src/components/SafeAnchor";
import { Key } from "./Menu";

export interface MenuItemProps
  extends WithComponentProps,
    Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
  className?: string;

  style?: React.CSSProperties;

  children?: React.ReactNode;

  active?: boolean;

  isSelected?: boolean;

  eventKey?: Key;

  onSelect?: (eventKey: Key, event: React.SyntheticEvent) => void;
}

const defaultProps: Partial<MenuItemProps> = {
  component: "li",
};

const MenuItem: RefForwardingComponent<"li", MenuItemProps> = React.forwardRef(
  (props: MenuItemProps, ref: React.Ref<HTMLElement>) => {
    const {
      component: Component,
      className,
      style,
      onClick,
      onSelect,
      eventKey,
    } = props;
    const classes = useStyles();

    const handleClick = React.useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        onSelect?.(eventKey, event);
        onClick?.(event);
      },
      [eventKey, onClick, onSelect]
    );

    return (
      <Component
        ref={ref}
        style={style}
        className={classNames(className, {
          [classes.menuItem]: true,
        })}
        onClick={handleClick}
      >
        <SafeAnchor
          className={classNames(className, {
            [classes.itemLink]: true,
          })}
        >
          1111
        </SafeAnchor>
      </Component>
    );
  }
);

MenuItem.defaultProps = defaultProps;
MenuItem.displayName = "MenuItem";

export default MenuItem;
