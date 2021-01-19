import React from "react";
import { RefForwardingComponent, WithComponentProps } from "src/@types/common";
import classNames from "classnames";
import useStyles from "./Menu.styles";
import { HoverEventHandler } from "./interface";

export interface MenuBodyProps
  extends WithComponentProps,
    Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
  collapse?: boolean;

  children?: React.ReactNode;

  className?: string;

  style?: React.CSSProperties;

  activeKey?: string;

  onSelect?: (eventKey: string, event: React.SyntheticEvent) => void;
}

const defaultProps: Partial<MenuBodyProps> = {};

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

    const handleItemHover: HoverEventHandler = (e) => {
      const { key, hover } = e;

      updateActiveKey()
    };

    const items = React.Children.map(children, (child: any) => {
      const displayName = child?.type?.displayName;

      if (displayName === "MenuItem") {
      }

      return child;
    });

    return (
      <Component
        style={style}
        ref={ref}
        className={classNames(className, {
          [classes.menu]: true,
          [classes.collapse]: collapse,
        })}
      >
        {items}
      </Component>
    );
  }
);

MenuBody.defaultProps = defaultProps;
MenuBody.displayName = "MenuBody";

export default MenuBody;

const updateActiveKey = () => {};
