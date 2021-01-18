import React from "react";
import classNames from "classnames";
import { WithComponentProps, RefForwardingComponent } from "src/@types/common";
import SafeAnchor from "src/components/SafeAnchor";
import { cloneElement, isValidElement } from "src/utilities/reactNode";
import useStyles from "./Menu.styles";

export interface MenuItemProps
  extends WithComponentProps,
    Omit<
      React.HtmlHTMLAttributes<HTMLElement>,
      "onSelect" | "onClick" | "onMouseEnter" | "onMouseLeave"
    > {
  collapse?: boolean;

  disabled?: boolean;

  divider?: boolean;

  eventKey?: string;

  className?: string;

  style?: React.CSSProperties;

  children?: React.ReactNode;

  selectedKeys?: string[];

  title?: string;

  onClick?: (eventKey: string, event: React.MouseEvent) => void;

  onSelect?: (eventKey: string, event: React.MouseEvent) => void;

  onDeselect?: (eventKey: string, event: React.MouseEvent) => void;

  onDestroy?: (eventKey: string) => void;

  onMouseEnter?: (eventKey: string, event: React.MouseEvent) => void;

  onMouseLeave?: (eventKey: string, event: React.MouseEvent) => void;

  isSelected?: boolean;

  active?: boolean;

  multiple?: boolean;

  icon?: React.ReactNode;

  indent?: number;

  level?: number;
}

const defaultProps: Partial<MenuItemProps> = {
  component: "li",
};

const MenuItem: RefForwardingComponent<"li", MenuItemProps> = React.forwardRef(
  (props: MenuItemProps, ref: React.Ref<HTMLElement>) => {
    const {
      component: Component,
      collapse,
      disabled,
      className,
      children,
      onClick,
      eventKey,
      level,
      icon,
      isSelected,
      multiple,
      onSelect,
      onDeselect,
      onMouseEnter,
      onMouseLeave,
    } = props;
    const classes = useStyles();

    const handleClick: React.MouseEventHandler<HTMLElement> = React.useCallback(
      (event) => {
        console.log(isSelected, multiple);
        onClick?.(eventKey, event);
        if (multiple) {
          if (isSelected) {
            onDeselect?.(eventKey, event);
          } else {
            onSelect?.(eventKey, event);
          }
        } else if (!isSelected) {
          onSelect?.(eventKey, event);
        }
      },
      [eventKey, isSelected, multiple, onClick, onDeselect, onSelect]
    );

    const handleMouseEnter = React.useCallback(
      (event: React.MouseEvent) => {
        onMouseEnter?.(eventKey, event);
      },
      [eventKey, onMouseEnter]
    );

    const handleMouseLeave = React.useCallback(
      (event: React.MouseEvent) => {
        onMouseLeave?.(eventKey, event);
      },
      [eventKey, onMouseLeave]
    );

    const mouseEvent = {
      onClick: handleClick,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    };

    const renderItemChildren = () => {
      if (isValidElement(children) && children.type === "span") {
        if (
          children &&
          collapse &&
          level === 1 &&
          typeof children === "string"
        ) {
          return <span>{(children as string).charAt(0)}</span>;
        }
        return children;
      }

      return <span>{children}</span>;
    };
    

    return (
      <Component
        ref={ref}
        className={classNames(className, {
          [classes.menuItem]: true,
          [classes.selected]: isSelected,
          [classes.disabled]: disabled,
        })}
        {...mouseEvent}
      >
        {cloneElement(icon, {
          className: classNames(
            isValidElement(icon) ? icon.props?.className : "",
            "prefix-icon"
          ),
        })}
        {renderItemChildren()}
      </Component>
    );
  }
);

MenuItem.defaultProps = defaultProps;
MenuItem.displayName = "MenuItem";

export default MenuItem;
