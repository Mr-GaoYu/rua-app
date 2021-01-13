import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import Menu from "./Menu";
import MenuItem from "./MenuItem";
import AcUnitIcon from "@material-ui/icons/AcUnit";

export default {
  title: "Rua/Menu",
} as Meta;

export const NavBar = (args) => {
  return (
    <Menu {...args}>
      <MenuItem icon={<AcUnitIcon />}>Dashboard</MenuItem>
    </Menu>
  );
};

NavBar.args = {
  expanded: true,
};
