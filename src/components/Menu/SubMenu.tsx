import React from "react";
import PropTypes from "prop-types";
import MenuToggle from "./MenuToggle";
import PopupMenu from "./PopupMenu";
import { MenuContext, MenuContextType } from "./Menu";
import { WithComponentProps, RefForwardingComponent } from "src/@types/common";
import Collapse from "src/components/core/Collapse";
import {
  MenuClickEventHandler,
  SelectEventHandler,
  MenuHoverEventHandler,
  DestroyEventHandler,
} from "./interface";
import useControlled from "src/hooks/useControlled";

export type TriggerPopup = "click" | "hover";
export interface SubMenuProps<T = string>
  extends WithComponentProps,
    Omit<
      React.HTMLAttributes<HTMLElement>,
      "title" | "onSelect" | "onClick" | "onMouseEnter" | "onMouseLeave"
    > {
  /** Define this title as a submenu */
  title?: React.ReactNode;

  /** Define this icon */
  icon?: React.ReactElement;

  /** The value of the current option */
  eventKey: T;

  /** Define menu indent width */
  indent?: number;

  /** Define the layer number of menu */
  level?: number;

  /** Whether or not component is disabled */
  disabled?: boolean;

  /** Open the menu and control it */
  isOpen?: boolean;

  /** Whether it's activated or not */
  active?: boolean;

  onOpenChange?: (eventKey: string) => void;
  onClick?: MenuClickEventHandler<T>;
  onSelect?: SelectEventHandler<T>;
  onDeselect?: SelectEventHandler<T>;
  onMouseEnter?: MenuHoverEventHandler<T>;
  onMouseLeave?: MenuHoverEventHandler<T>;
}

const defaultProps: Partial<SubMenuProps> = {
  component: "li",
  prefixclass: "sub-menu",
};

const SubMenu: RefForwardingComponent<"li", SubMenuProps> = React.forwardRef(
  (props: SubMenuProps, ref: React.Ref<HTMLLIElement>) => {
    const {
      component: Component,
      children,
      title,
      disabled,
      onClick,
      onOpenChange,
      eventKey,
    } = props;

    const { openKeys } = React.useContext<MenuContextType>(MenuContext);

    const handleClick = React.useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        if (disabled) {
          return;
        }
        onClick?.(eventKey, event);
        onOpenChange?.(eventKey);
      },
      [disabled, eventKey, onClick, onOpenChange]
    );
    const handleMouseLeave = React.useCallback(
      (event: React.MouseEvent<HTMLElement>) => {},
      []
    );
    const handleMouseEnter = React.useCallback(
      (event: React.MouseEvent<HTMLElement>) => {},
      []
    );

    const open = openKeys.indexOf(eventKey) !== -1;

    const MenuElement = (
      <Collapse in={open} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    );

    const mouseEvent = {
      onClick: handleClick,
      onMouseLeave: handleMouseLeave,
      onMouseEnter: handleMouseEnter,
    };

    const toggleElement = (
      <MenuToggle role="button" {...mouseEvent}>
        {title}
      </MenuToggle>
    );

    return (
      <Component ref={ref}>
        {toggleElement}
        {MenuElement}
      </Component>
    );
  }
);

SubMenu.displayName = "SubMenu";
SubMenu.defaultProps = defaultProps;

export default SubMenu;
