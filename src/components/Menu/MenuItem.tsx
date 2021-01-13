import React from "react";
import { Key } from "./interface";
import ListItem from "src/components/core/ListItem";
import { RefForwardingComponent, WithComponentProps } from "src/@types/common";

export interface MenuItemProps<T = Key> extends Omit<WithComponentProps,'button'> {
  icon?: React.ReactElement;
  button?: boolean
}

const defaultProps: Partial<MenuItemProps> = {
  component: ListItem,
  button:false
};

const MenuItem: RefForwardingComponent<
  typeof ListItem,
  MenuItemProps
> = React.forwardRef((props: MenuItemProps, ref: React.Ref<HTMLElement>) => {
  const { component: Component, icon, children, ...rest } = props;

  return (
    <Component ref={ref} {...rest}>
      {icon}
      {children}
    </Component>
  );
});

MenuItem.displayName = "MenuItem";
MenuItem.defaultProps = defaultProps;

export default MenuItem;
