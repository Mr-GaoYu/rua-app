import React from "react";
import classNames from "classnames";
import { WithComponentProps, RefForwardingComponent } from "src/@types/common";
import { makeStyles, createStyles, Theme } from "src/components/core/styles";
import SafeAnchor from "src/components/SafeAnchor";
import { cloneElement, isValidElement } from "src/utilities/reactNode";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuItem: {
      listStyle: "none",
    },
    navLink: {
      color: "#6c757d",
      padding: "15px 30px",
      position: "relative",
      transition: "all .4s",
      display: "block",
      textDecoration: "none",
      boxSizing: 'border-box',
      "& .prefix-icon": {
        width: 20,
        height: 20,
        margin: "0 10px 0 3px",
        textAlign: "center",
        verticalAlign: "middle",
      },
      "& span": {
        verticalAlign: "middle",
      },
      "&:hover": {
        color: "#727cf5",
      },
    },
    collapse: {
      "& $navLink": {
        padding: "15px 20px",
        minHeight: 56,
        "& .prefix-icon": {
          marginRight: 20,
        },
        "& span": {
          display: "none",
          paddingLeft: 10,
        },
        "&:hover": {
          position: "relative",
          width: 260,
          background: "#fff",
          "& span": {
            display: "inline",
          },
        },
      },
    },
  })
);

export interface MenuItemGroupProps
  extends WithComponentProps,
    Omit<React.HtmlHTMLAttributes<HTMLElement>, "onSelect"> {
  icon?: React.ReactNode;

  collapse?: boolean;

  disabled?: boolean;

  divider?: boolean;

  eventKey?: string;

  level?: number;

  onSelect?: (eventKey: string, event: React.SyntheticEvent) => void;
}

const defaultProps: Partial<MenuItemGroupProps> = {
  component: "li",
};

const MenuItemGroup: RefForwardingComponent<"li", MenuItemGroupProps> = React.forwardRef(
  (props: MenuItemGroupProps, ref: React.Ref<HTMLElement>) => {
    const {
      component: Component,
      collapse,
      disabled,
      className,
      children,
      onSelect,
      onClick,
      eventKey,
      level,
      icon,
    } = props;
    const classes = useStyles();

    const handleClick: React.MouseEventHandler<HTMLElement> = React.useCallback(
      (event) => {
        if (!disabled) {
          onSelect?.(eventKey, event);
          onClick?.(event);
        }
      },
      [disabled, eventKey, onClick, onSelect]
    );

    const mouseEvent = {
      onClick: handleClick,
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
          [classes.collapse]: collapse,
        })}
      >
        <SafeAnchor
          className={classNames({
            [classes.navLink]: true,
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
        </SafeAnchor>
      </Component>
    );
  }
);

MenuItemGroup.defaultProps = defaultProps;
MenuItemGroup.displayName = "MenuItemGroup";

export default MenuItemGroup;
