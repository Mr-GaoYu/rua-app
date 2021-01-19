import React from "react";
import { RefForwardingComponent, WithComponentProps } from "src/@types/common";
import classNames from "classnames";
import useStyles from "./Menu.styles";
import SafeAnchor from "src/components/SafeAnchor";
import { HoverEventHandler } from "./interface";

export interface MenuItemProps
  extends WithComponentProps,
    Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
  className?: string;

  style?: React.CSSProperties;

  children?: React.ReactNode;

  active?: boolean;

  isSelected?: boolean;

  eventKey?: string;

  onSelect?: (eventKey: string, event: React.SyntheticEvent) => void;

  onItemHover?: HoverEventHandler;
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
      onItemHover,
      onMouseEnter,
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

    const handleMouseEnter = React.useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        onItemHover?.({ key: eventKey, hover: true });
        onMouseEnter?.(event);
      },
      [eventKey, onItemHover, onMouseEnter]
    );

    const handleMouseLeave = React.useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        onItemHover?.({ key: eventKey, hover: false });
        onMouseEnter?.(event);
      },
      [eventKey, onItemHover, onMouseEnter]
    );

    return (
      <Component
        ref={ref}
        style={style}
        className={classNames(className, {
          [classes.menuItem]: true,
        })}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
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
