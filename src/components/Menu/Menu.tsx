import React from "react";
import classNames from "classnames";
import { WithComponentProps, RefForwardingComponent } from "src/@types/common";
import { makeStyles, createStyles, Theme } from "src/components/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menu: {
      minWidth: 250,
      maxWidth: 250,
      zIndex: 10,
      position: "relative",
      backgroundColor: "#ffffff",
      boxShadow: "0 0 35px 0 rgba(154,161,171,.15)",
      border: "1px solid red",
      padding: 0,
      margin: 0,
    },
    collapse: {
      minWidth: 70,
      maxWidth: 70,
      zIndex: 5,
    },
  })
);

export interface MenuProps
  extends WithComponentProps,
    React.HtmlHTMLAttributes<HTMLElement> {
  collapse?: boolean;
}

const defaultProps: Partial<MenuProps> = {
  component: "ul",
};

const Menu: RefForwardingComponent<"ul", MenuProps> = React.forwardRef(
  (props: MenuProps, ref: React.Ref<HTMLElement>) => {
    const { component: Component, collapse, className,children } = props;
    const classes = useStyles();

    return (
      <Component
        ref={ref}
        className={classNames(className, {
          [classes.menu]: true,
          [classes.collapse]: collapse,
        })}
      >
        {children}
      </Component>
    );
  }
);

Menu.defaultProps = defaultProps;
Menu.displayName = "Menu";

export default Menu;
