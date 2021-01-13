import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import Menu from "./Menu";
import MenuItem from "./MenuItem";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew";

export default {
  title: "Rua/Menu",
} as Meta;

export const NavBar = (args) => {
  return (
    <Menu {...args}>
      <MenuItem icon={<AcUnitIcon />} active divider eventKey="Dashboard">
        Dashboard
      </MenuItem>
      <MenuItem icon={<AcUnitIcon />} eventKey="Echarts">
        Echarts
      </MenuItem>
    </Menu>
  );
};

NavBar.args = {
  expanded: true,
};
