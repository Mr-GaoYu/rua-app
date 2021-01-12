import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import Menu from "./Menu";
import MenuItem from "./MenuItem";
import SubMenu from "./SubMenu";
import ListItemText from "src/components/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";

export default {
  title: "Rua/Menu",
} as Meta;

export const NavBar = () => (
  <Menu>
    <MenuItem expandIcon={<DeleteIcon />} eventKey="dashboard">
      Dashboard
    </MenuItem>
    <MenuItem expandIcon={<DeleteIcon />} eventKey="test">
      test
    </MenuItem>
    <SubMenu title="Dashboard" eventKey="test2">
      <MenuItem expandIcon={<DeleteIcon />} eventKey="dashboard">
        Dashboard
      </MenuItem>
      <MenuItem expandIcon={<DeleteIcon />} eventKey="test">
        test
      </MenuItem>
    </SubMenu>
  </Menu>
);
