import React from "react";
import classNames from "classnames";
import { WithComponentProps, RefForwardingComponent } from "src/@types/common";
import { MenuContext, MenuContextType } from "./Menu";
import { equals } from "ramda";
import toArray from "rc-util/lib/Children/toArray";
import useStyles from "./Menu.styles";

export interface MenuBodyProps {
  eventKey?: string;

  activeKey?: string;

  selectedKeys?: string[];

  defaultSelectedKeys?: string[];

  defaultOpenKeys?: string[];

  openKeys?: string[];

  active?: boolean;

  disabled?: boolean;

  onSelect?: (eventKey: string, event: React.SyntheticEvent) => void;

  onDeselect?: (eventKey: string, event: React.SyntheticEvent) => void;

  onClick?: (eventKey: string, event: React.SyntheticEvent) => void;

  onOpenChange?: (eventKey: string, event: React.SyntheticEvent) => void;

  onMouseEnter?: () => void;

  onMouseLeave?: () => void;
}

export type CombinedProps = MenuBodyProps & WithComponentProps;

const defaultProps: Partial<CombinedProps> = {
  component: "ul",
};

const MenuBody: RefForwardingComponent<"ul", CombinedProps> = React.forwardRef(
  (props: CombinedProps, ref: React.Ref<HTMLElement>) => {
    const {
      component: Component,
      eventKey,
      children,
      onClick,
      onSelect,
      onDeselect,
      onOpenChange,
    } = props;
    const classes = useStyles();

    const { openKeys, selectedKeys, activeKey, collapse } = React.useContext(
      MenuContext
    );

    const handleClick = React.useCallback(
      (eventKey: string, event: React.MouseEvent) => {
        onClick?.(eventKey, event);
      },
      [onClick]
    );

    const handleSelect = React.useCallback(
      (eventKey: string, event: React.MouseEvent) => {
        onSelect?.(eventKey, event);
      },
      [onSelect]
    );

    const handleDeselect = React.useCallback(
      (eventKey: string, event: React.MouseEvent) => {
        onDeselect?.(eventKey, event);
      },
      [onDeselect]
    );

    const handleOpenChange = React.useCallback(
      (eventKey: string, event: React.MouseEvent) => {
        onOpenChange?.(eventKey, event);
      },
      [onOpenChange]
    );

    const renderCommonMenuItem = (
      child: React.ReactElement,
      index: number,
      extraProps: any
    ) => {
      const { eventKey } = child.props;
      const newChildProps = {
        isSelected: selectedKeys.indexOf(eventKey) !== -1,
        onClick: handleClick,
        onSelect: handleSelect,
        onDeselect: handleDeselect,
        onOpenChange: handleOpenChange,
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
      <Component
        ref={ref}
        className={classNames({
          [classes.menu]: true,
          [classes.collapse]: collapse,
        })}
      >
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
