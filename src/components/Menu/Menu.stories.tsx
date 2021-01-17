import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import Menu from "./Menu";
import MenuItem from "./MenuItem";
import SubMenu from "./SubMenu";
import AcUnitIcon from "@material-ui/icons/AcUnit";

export default {
  title: "Rua/Menu",
} as Meta;

export const NavBar = (args) => {
  return (
    <Menu {...args}>
      <MenuItem {...args} eventKey="a">Dashboard</MenuItem>
      <SubMenu {...args} eventKey="b" title="Dashboard">
        <MenuItem {...args} eventKey="c">Dashboard</MenuItem>
        <MenuItem {...args} eventKey="d">Dashboard</MenuItem>
      </SubMenu>
    </Menu>
  );
};

NavBar.args = {
  collapse: false,
  icon: <AcUnitIcon />
};
