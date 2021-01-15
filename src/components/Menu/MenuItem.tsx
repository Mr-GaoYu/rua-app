import React from "react";
import classNames from "classnames";
import { WithComponentProps, RefForwardingComponent } from "src/@types/common";
import { makeStyles, createStyles, Theme } from "src/components/core/styles";
import SafeAnchor from "src/components/SafeAnchor";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuItem: {
      listStyle: "none",
      "& .prefix": {
        width: 20,
        height: 20,
        margin: "0 10px 0 3px",
      },
    },
    navLink: {
      color: "#6c757d",
      padding: "15px 30px",
      position: "relative",
      transition: "all .4s",
      display: "block",
      outline: 0,
      textDecoration: "none",
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
        "& span": {
          display: "none",
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

export interface MenuItemProps
  extends WithComponentProps,
    Omit<React.HtmlHTMLAttributes<HTMLElement>, "onSelect"> {
  icon?: React.ReactElement;

  collapse?: boolean;

  disabled?: boolean;

  divider?: boolean;

  eventKey?: string;

  onSelect?: (eventKey: string, event: React.SyntheticEvent) => void;
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
      onSelect,
      onClick,
      eventKey,
      icon: iconElement,
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
      if (!iconElement || (React.isValidElement(children) && children.type === 'span')) {
          if(children &&  typeof children === 'string'){
              
          }
          return children
      }

      return React.cloneElement(iconElement, {
        className: "prefix",
      });
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
          {renderItemChildren()}
        </SafeAnchor>
      </Component>
    );
  }
);

MenuItem.defaultProps = defaultProps;
MenuItem.displayName = "MenuItem";

export default MenuItem;
