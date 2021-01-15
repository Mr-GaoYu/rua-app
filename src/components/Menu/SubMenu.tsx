import React from "react";
import classNames from "classnames";
import { WithComponentProps, RefForwardingComponent } from "src/@types/common";
import { makeStyles, createStyles, Theme } from "src/components/core/styles";
import SafeAnchor from "src/components/SafeAnchor";
import Collapse from "src/components/core/Collapse";
import { cloneElement, isValidElement } from "src/utilities/reactNode";

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
    Omit<React.HtmlHTMLAttributes<HTMLElement>, "onSelect" | "title"> {
  icon?: React.ReactNode;

  collapse?: boolean;

  disabled?: boolean;

  divider?: boolean;

  eventKey?: string;

  level?: number;

  title?: React.ReactNode;

  onSelect?: (eventKey: string, event: React.SyntheticEvent) => void;
}

const defaultProps: Partial<SubMenuProps> = {
  component: "li",
};

const SubMenu: RefForwardingComponent<"li", SubMenuProps> = React.forwardRef(
  (props: SubMenuProps, ref: React.Ref<HTMLElement>) => {
    const {
      component: Component,
      collapse,
      disabled,
      className,
      children,
      onSelect,
      onClick,
      eventKey,
      level = 1,
      title,
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
            className: classNames(
              isValidElement(icon) ? icon.props?.className : "",
              "prefix-icon"
            ),
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
