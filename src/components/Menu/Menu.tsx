import React from "react";
import { Key } from "./interface";
import List from "src/components/core/List";
import { RefForwardingComponent, WithComponentProps } from "src/@types/common";
import PopupMenu from "./PopupMenu";

export interface MenuProps<T = Key> extends WithComponentProps {}

const defaultProps: Partial<MenuProps> = {
  component: List,
};

const Menu: RefForwardingComponent<typeof List, MenuProps> = React.forwardRef(
  (props: MenuProps, ref: React.Ref<HTMLElement>) => {
    const { component: Component ,...rest } = props;

    return (
      <Component ref={ref}>
        <PopupMenu {...rest}/>
      </Component>
    );
  }
);

Menu.displayName = "Menu";
Menu.defaultProps = defaultProps;

export default Menu;
