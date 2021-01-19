import React from "react";
import { RefForwardingComponent, WithComponentProps } from "src/@types/common";
import classNames from "classnames";
import useStyles from "./Menu.styles";
import { HoverEventHandler, RenderIconType } from "./interface";
import { getKeyFromChildrenIndex } from "./utils";

export interface MenuBodyProps
  extends WithComponentProps,
    Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
  collapse?: boolean;

  children?: React.ReactNode;

  className?: string;

  style?: React.CSSProperties;

  activeKey?: string;

  onSelect?: (eventKey: string, event: React.SyntheticEvent) => void;

  level?: number;

  indent?: number;

  multiple?: boolean;

  itemIcon?: RenderIconType;

  expandIcon?: RenderIconType;

  itemClass?: (level: number) => string;
}

const defaultProps: Partial<MenuBodyProps> = {
  level: 1,
};

const MenuBody: RefForwardingComponent<"ul", MenuBodyProps> = React.forwardRef(
  (props: MenuBodyProps, ref: React.Ref<HTMLElement>) => {
    const {
      component: Component,
      children,
      style,
      className,
      collapse,
      itemIcon,
      expandIcon,
      level,
      indent,
      multiple,
      itemClass
    } = props;
    const classes = useStyles();

    const handleItemHover: HoverEventHandler = (e) => {
      const { key, hover } = e;

      updateActiveKey();
    };

    const items = React.Children.map(
      children,
      (child: React.ReactElement, index: number) => {
        const childProps = child.props;
        const key = getKeyFromChildrenIndex(child, childProps.eventKey, index);

        const newChildProps = {
          eventKey: key,
          index,
          level,
          indent,
          multiple,
          className: itemClass?.(level),
          active: !childProps.disabled,
          itemIcon: childProps.itemIcon || itemIcon,
          expandIcon: childProps.expandIcon || expandIcon,
        };
        return React.cloneElement(child, {
          ...newChildProps,
          key: key || index,
        });
      }
    );

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

const getActiveKey = (
  props: {
    children?: React.ReactNode;
    eventKey?: React.Key;
    defaultActiveFirst?: boolean;
  },
  originalActiveKey: string
) => {};

const updateActiveKey = () => {};
