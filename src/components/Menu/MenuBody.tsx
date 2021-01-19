import React from "react";
import { RefForwardingComponent, WithComponentProps } from "src/@types/common";
import classNames from "classnames";
import useStyles from "./Menu.styles";

export type Key = React.Key;
export interface MenuBodyProps
  extends WithComponentProps,
    Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
  collapse?: boolean;

  children?: React.ReactNode;

  className?: string;

  style?: React.CSSProperties;

  activeKey?: Key;

  onSelect?: (eventKey: Key, event: React.SyntheticEvent) => void;
}

const defaultProps: Partial<MenuBodyProps> = {
};

const MenuBody: RefForwardingComponent<"ul", MenuBodyProps> = React.forwardRef(
  (props: MenuBodyProps, ref: React.Ref<HTMLElement>) => {
    const {
      component: Component,
      children,
      style,
      className,
      collapse,
    } = props;
    const classes = useStyles();

    return (
      <Component
        style={style}
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

MenuBody.defaultProps = defaultProps;
MenuBody.displayName = "MenuBody";

export default MenuBody;
