import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import Item from "./MenuItem";
import Sub from "./SubMenu";
import M from "./Menu";
import AcUnitIcon from "@material-ui/icons/AcUnit";

export default {
  title: "Rua/Menu",
} as Meta;

export const MenuItem = () => (
  <Item title="Dashboard" collapsed={true} prepend={<AcUnitIcon />} />
);
export const SubMenu = () => {
  return (
    <Sub>
      <Item title="Dashboard" />
    </Sub>
  );
};
export const Menu = (args) => {
  const { collapsed } = args;
  return (
    <M collapsed={collapsed}>
      <Item title="Dashboard" />
    </M>
  );
};

Menu.args = {
  collapsed: false,
};
