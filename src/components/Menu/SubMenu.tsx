import React from "react";
import PropTypes from "prop-types";
import MenuToggle from "./MenuToggle";
import PopupMenu from "./PopupMenu";
import { MenuContext, MenuContextType } from "./Menu";
import { WithComponentProps, RefForwardingComponent } from "src/@types/common";

export type TriggerPopup = "click" | "hover";
export interface SubMenuProps<T = string>
  extends WithComponentProps,
    Omit<React.HTMLAttributes<HTMLElement>, "onSelect" | "title"> {
  /** Define this title as a submenu */
  title?: React.ReactNode;

  /** Define this icon */
  icon?: React.ReactElement;

  /** Define the only sign of submenu  */
  eventKey?: string;

  /** Triggering events */
  trigger?: TriggerPopup | TriggerPopup[];

  /** Whether or not component is disabled */
  disabled?: boolean;

  /** Open the menu and control it */
  open?: boolean;
}

const defaultProps: Partial<SubMenuProps> = {
  component: "li",
  prefixClass: "sub-menu",
  trigger: "click",
  className: "",
  style: {},
};

const SubMenu: RefForwardingComponent<"li", SubMenuProps> = React.forwardRef(
  (props: SubMenuProps, ref: React.Ref<HTMLLIElement>) => {
    const {
      component: Component,
      style,
      className,
      title,
      eventKey,
      children,
      disabled,
      ...rest
    } = props;

    const { onOpenChange, openKeys, collapsed } = React.useContext<
      MenuContextType
    >(MenuContext);

    const overlayTarget = React.useRef();
    const triggerTarget = React.useRef();

    const handleOpenChange = React.useCallback(
      (event: React.MouseEvent) => {
        onOpenChange?.(eventKey, event);
      },
      [eventKey, onOpenChange]
    );

    const handleMouseEnter = React.useCallback(()=>{

    }, [disabled])

    const handleMouseLeave = React.useCallback(()=>{

    }, [disabled])

   

    const MenuElement = <PopupMenu ref={overlayTarget}></PopupMenu>;

    const toggleElement = (
      <MenuToggle ref={triggerTarget} button role="button">
        {title}
      </MenuToggle>
    );

    return (
      <Component ref={ref} style={style}>
        {toggleElement}
        {MenuElement}
      </Component>
    );
  }
);

SubMenu.displayName = "SubMenu";
SubMenu.defaultProps = defaultProps;

export default SubMenu;
