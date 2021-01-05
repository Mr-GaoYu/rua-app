import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import Menu from "./Menu";

export default {
  title: "Rua/Menu",
  component:Menu
} as Meta;

export const PrimaryNav = (args) => (
  <Menu />
);
