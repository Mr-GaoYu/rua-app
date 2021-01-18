import React from "react";
import classNames from "classnames";
import { WithComponentProps, RefForwardingComponent } from "src/@types/common";
import { makeStyles, createStyles, Theme } from "src/components/core/styles";
import SafeAnchor from "src/components/SafeAnchor";
import Collapse from "src/components/core/Collapse";
import { cloneElement, isValidElement } from "src/utilities/reactNode";
import { loopMenuItemRecursively } from "./util";
import { OpenEventHandler, MenuHoverEventHandler } from "./interface";
import useControlled from "src/hooks/useControlled";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuItem: {
      listStyle: "none",
      whiteSpace: "nowrap",
    },
    navLink: {
      color: "#6c757d",
      padding: "15px 30px",
      position: "relative",
      transition: "all .4s",
      display: "block",
      textDecoration: "none",
      boxSizing: "border-box",
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
      "&:hover": {
        "& $subMenu": {
          left: 70,
          position: "absolute",
          width: 190,
          padding: "5px 0",
          zIndex: 9999,
          backgroundColor: "#fff",
        },
      },
    },
    subMenu: {
      padding: 0,
    },
  })
);

export interface SubMenuProps
  extends WithComponentProps,
    Omit<
      React.HtmlHTMLAttributes<HTMLElement>,
      "onSelect" | "title" | "onMouseEnter" | "onMouseLeave"
    > {
  title?: React.ReactNode;

  icon?: React.ReactElement;

  activeKey?: string;

  collapse?: boolean;

  disabled?: boolean;

  eventKey?: string;

  open?: boolean;

  divider?: boolean;

  level?: number;

  className?: string;

  onClose?: () => void;

  onOpen?: () => void;

  onToggle?: (open?: boolean) => void;

  onSelect?: (eventKey: string, event: React.MouseEvent) => void;

  onOpenChange?: (eventKey: string, event: React.MouseEvent) => void;

  onMouseEnter?: (eventKey: string, event: React.MouseEvent) => void;

  onMouseLeave?: (eventKey: string, event: React.MouseEvent) => void;
}

const defaultProps: Partial<SubMenuProps> = {
  component: "li",
  level: 1,
};

const SubMenu: RefForwardingComponent<"li", SubMenuProps> = React.forwardRef(
  (props: SubMenuProps, ref: React.Ref<HTMLElement>) => {
    const {
      component: Component,
      open: openProp,
      title,
      icon,
      collapse,
      className,
      onOpen,
      onClose,
      onToggle,
      onOpenChange,
      onMouseEnter,
      onMouseLeave,
      eventKey,
      disabled,
      level,
      onSelect,
      children,
    } = props;
    const classes = useStyles();

    const handleOpenChange = React.useCallback(
      (eventKey: string, event: React.MouseEvent) => {
        onOpenChange?.(eventKey, event);
      },
      [onOpenChange]
    );
    const handleMouseLeave = React.useCallback(
      (eventKey: string, event: React.MouseEvent) => {
        onMouseLeave?.(eventKey, event);
      },
      [onMouseLeave]
    );
    const handleMouseEnter = React.useCallback(
      (eventKey: string, event: React.MouseEvent) => {
        onMouseEnter?.(eventKey, event);
      },
      [onMouseEnter]
    );


    const handleClick = React.useCallback((e: React.MouseEvent) => {}, []);

    const handleTitleClick = React.useCallback(
      (event: React.MouseEvent) => {
        handleOpenChange(eventKey, event);
      },
      [eventKey, handleOpenChange]
    );

    const handleTitleMouseEnter = React.useCallback((e: React.MouseEvent) => {},
    []);

    const handleTitleMouseLeave = React.useCallback((e: React.MouseEvent) => {},
    []);

    const mouseEvent = {
      onClick: handleTitleClick,
    };

    const renderTitle = () => {
      if (!icon) {
        return collapse && level === 1 && title && typeof title === "string" ? (
          <span>{title.charAt(0)}</span>
        ) : (
          title
        );
      }
      const titleIsSpan = isValidElement(title) && title.type === "span";
      return (
        <>
          {icon}
          {titleIsSpan ? title : <span>{title}</span>}
        </>
      );
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
            className: classNames("prefix-icon"),
          })}
          {renderTitle()}
        </SafeAnchor>
        <Collapse
          in={true}
          component="ul"
          className={classNames({
            [classes.subMenu]: true,
          })}
        >
          {children}
        </Collapse>
      </Component>
    );
  }
);

SubMenu.defaultProps = defaultProps;
SubMenu.displayName = "SubMenu";

export default SubMenu;
