import React from "react";
import MenuItem from "./MenuItem";
import MenuItemGroup from "./MenuItemGroup";
import SubMenu from "./SubMenu";

export const loopMenuItemRecursively = (
  children: React.ReactNode,
  keys: string[],
  ret: { find: boolean }
) => {
  if (!children || ret.find) {
    return;
  }
  React.Children.forEach(children, (c: React.ReactElement) => {
    if (c) {
      const construct = c.type as
        | typeof MenuItem
        | typeof SubMenu
        | typeof MenuItemGroup;
      const displayName = construct?.displayName;
      if (
        !construct ||
        !(
          displayName === "MenuItem" ||
          displayName === "SubMenu" ||
          displayName === "MenuItemGroup"
        )
      ) {
        return;
      }
      if (keys.indexOf((c as any).props?.eventKey) !== -1) {
        ret.find = true;
      } else if (c.props.children) {
        loopMenuItemRecursively(c.props.children, keys, ret);
      }
    }
  });
};
