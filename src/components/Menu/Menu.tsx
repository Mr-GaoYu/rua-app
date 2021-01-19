import React from "react";
import { RefForwardingComponent, WithComponentProps } from "src/@types/common";
import MenuBody from "./MenuBody";
import { RenderIconType } from "./interface";

export interface MenuProps
  extends WithComponentProps,
    Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
  collapse?: boolean;

  children?: React.ReactNode;

  className?: string;

  style?: React.CSSProperties;

  activeKey?: string;

  menuTrigger?: "hover" | "click";

  selectedKeys?: string[];

  defaultSelectedKeys?: string[];

  openKeys?: string[];

  defaultOpenKeys?: string[];

  itemIcon?: RenderIconType;

  expandIcon?: RenderIconType;

  indent?: number;

  multiple?: boolean;

  level?: number;

  onSelect?: (eventKey: string, event: React.SyntheticEvent) => void;

  itemClass?: (level: number) => string;
}

export const MenuContext = React.createContext(null);

const defaultProps: Partial<MenuProps> = {
  component: "ul",
};

const Menu: RefForwardingComponent<"ul", MenuProps> = React.forwardRef(
  (props: MenuProps, ref: React.Ref<HTMLElement>) => {
    const { collapse } = props;

    const contextValue = {
      collapse,
    };

    return (
      <MenuContext.Provider value={contextValue}>
        <MenuBody {...props} />
      </MenuContext.Provider>
    );
  }
);

Menu.defaultProps = defaultProps;
Menu.displayName = "Menu";

export default Menu;
