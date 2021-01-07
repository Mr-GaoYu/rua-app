import React from "react";
import classNames from "classnames";
import ListItem, { ListItemProps } from "src/components/core/ListItem";
import ListItemText, {
  ListItemTextProps,
} from "src/components/core/ListItemText";

export interface MenuItemProps {
  eventKey?: string;
  title: string;
  disabled?: boolean;
  component?: React.ExoticComponent;
  prepend?: JSX.Element;
  append?: JSX.Element;
  level?: number;
  className?: string;
  style?: React.CSSProperties;
  collapsed?: boolean;
  listItemProps?: Omit<
    ListItemProps,
    "component" | "disabled" | "button" | "alignItems"
  >;
  ListItemTextProps?: Omit<ListItemTextProps, "disableTypography" | "primary">;
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const {
    prepend,
    append,
    component,
    disabled,
    title,
    className,
    style,
    collapsed,
    listItemProps,
    ListItemTextProps,
  } = props;

  return (
    <ListItem
      {...listItemProps}
      button
      alignItems="center"
      component={component}
      disabled={disabled}
      className={className}
      style={style}
    >
      {!!prepend && <div className="prepend">{prepend}</div>}
      {title && !collapsed && (
        <ListItemText
          {...ListItemTextProps}
          disableTypography={true}
          primary={title}
        />
      )}
      {!!append && !collapsed && <div className="append">{append}</div>}
    </ListItem>
  );
};

export default MenuItem;
