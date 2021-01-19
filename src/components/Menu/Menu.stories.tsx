import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import Menu from "./Menu";
import MenuItem from "./MenuItem";

export default {
  title: "Rua/Menu",
} as Meta;

export const NavBar = (args) => {
  return <Menu {...args}>
    <MenuItem>2222</MenuItem>
  </Menu>;
};

NavBar.args = {
  collapse: false,
};
