import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import Item from "./MenuItem";
import Sub from "./SubMenu";
import M from "./Menu";
import DeleteIcon from "@material-ui/icons/Delete";

export default {
  title: "Rua/Menu",
} as Meta;

export const MenuItem = () => (
  <Item title="Dashboard" prepend={<DeleteIcon />} />
);
export const Menu = () => (
  <M>
    <Item title="Dashboard" prepend={<DeleteIcon />} />
    <Item title="Dashboard" prepend={<DeleteIcon />} />
    <Sub title="Dashboard" prepend={<DeleteIcon />} collapsed={true}>
      <Item title="Dashboard" prepend={<DeleteIcon />} />
      <Item title="Dashboard" prepend={<DeleteIcon />} />
      <Sub title="Dashboard" prepend={<DeleteIcon />} collapsed={true}>
        <Item title="Dashboard" prepend={<DeleteIcon />} />
        <Item title="Dashboard" prepend={<DeleteIcon />} />
      </Sub>
    </Sub>
  </M>
);
export const SubMenu = () => (
  <Sub title="Dashboard" prepend={<DeleteIcon />} collapsed={true}>
    <Item title="Dashboard" prepend={<DeleteIcon />} />
    <Item title="Dashboard" prepend={<DeleteIcon />} />
  </Sub>
);
