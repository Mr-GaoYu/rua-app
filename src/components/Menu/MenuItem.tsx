import React from "react";
import classNames from "classnames";
import ListItem from "src/components/core/ListItem";
import ListItemText from "src/components/core/ListItemText";
import { NavLink, NavLinkProps } from "react-router-dom";
import MenuContext from "./MenuContext";
import { RenderIconType } from "./interface";

export interface MenuItemProps extends Omit<NavLinkProps, "to"> {
  eventKey?: React.Key;
  level?: number;
  role?: string;
  title?: string;
  href?: string;
  disabled?: boolean;
  attribute?: Record<string, string>;
  prefixComponent?: RenderIconType;
  suffixComponent?: RenderIconType;
  className?: string;
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const {
    href,
    eventKey,
    prefixComponent,
    suffixComponent,
    title,
    ...rest
  } = props;

  const { activeKey, selectedKeys } = React.useContext(MenuContext);

  const isSelected = React.useMemo(
    () => selectedKeys.indexOf(eventKey) !== -1,
    [selectedKeys, eventKey]
  );

  const renderNavLink = React.useMemo(() => {
    if (href) {
      return React.forwardRef(
        (linkProps: MenuItemProps, ref: React.Ref<HTMLAnchorElement>) => (
          <NavLink exact to={href} ref={ref} {...linkProps} />
        )
      );
    }
  }, [href]);

  const onClick = () => {
    
  }

  return (
    <ListItem component={renderNavLink} {...rest} button>
      {prefixComponent && <div>{prefixComponent}</div>}
      <ListItemText primary={title} disableTypography={true} />
      {suffixComponent && <div>{suffixComponent}</div>}
    </ListItem>
  );
};

export default MenuItem;
