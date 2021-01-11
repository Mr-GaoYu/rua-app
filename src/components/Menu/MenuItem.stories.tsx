import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import Menu from "./Menu";
import MenuItem from "./MenuItem";
import ListItemText from "src/components/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";

export default {
  title: "Rua/Menu",
} as Meta;

export const NavBar = () => (
  <Menu>
    <MenuItem icon={<DeleteIcon />}>Dashboard</MenuItem>
  </Menu>
);
