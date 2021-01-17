import React from "react";
import classNames from "classnames";
import { WithComponentProps, RefForwardingComponent } from "src/@types/common";
import { MenuContext, MenuContextType } from "./Menu";
import { equals } from "ramda";
import toArray from "rc-util/lib/Children/toArray";

export interface MenuBodyProps {
  eventKey?: string;

  activeKey?: string;

  active?: boolean;

  disabled?:boolean;
}

export type CombinedProps = MenuBodyProps & WithComponentProps;

const defaultProps: Partial<CombinedProps> = {
  component: "ul",
};

const MenuBody: RefForwardingComponent<"ul", CombinedProps> = React.forwardRef(
  (props: CombinedProps, ref: React.Ref<HTMLElement>) => {
    const { component: Component, eventKey, children } = props;

    const { openKeys, selectedKeys, activeKey } = React.useContext(MenuContext);

    const renderCommonMenuItem = (
      child: React.ReactElement,
      index: number,
      extraProps: any
    ) => {
      console.log(child, 222);
      const isActive = activeKey === eventKey;
      const childProps = child.props;
      const newChildProps = {
          active: !childProps?.disabled && isActive
      };
      return React.cloneElement(child, {
        ...newChildProps,
      });
    };

    const renderMenuItem = (
      child: React.ReactElement,
      index: number,
      subMenuKey: React.Key
    ) => {
      if (!child) {
        return null;
      }
      const extraProps = {
        openKeys,
        selectedKeys,
        subMenuKey,
      };
      return renderCommonMenuItem(child, index, extraProps);
    };

    return (
      <Component ref={ref}>
        {toArray(children).map((child: React.ReactElement, index: number) =>
          renderMenuItem(child, index, eventKey)
        )}
      </Component>
    );
  }
);

MenuBody.defaultProps = defaultProps;
MenuBody.displayName = "MenuBody";

export default MenuBody;
