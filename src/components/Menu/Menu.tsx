import React from "react";
import { RefForwardingComponent, WithComponentProps } from "src/@types/common";
import classNames from "classnames";
import useStyles from "./Menu.styles";
import MenuBody from "./MenuBody";

export type Key = React.Key;
export interface MenuProps
  extends WithComponentProps,
    Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
  collapse?: boolean;

  children?: React.ReactNode;

  className?: string;

  style?: React.CSSProperties;

  activeKey?: Key;

  onSelect?: (eventKey: Key, event: React.SyntheticEvent) => void;
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
