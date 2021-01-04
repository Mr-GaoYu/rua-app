import React from "react";
import { Provider } from "react-redux";
import { Story, Meta } from "@storybook/react/types-6-0";
import NavItem from "./NavItem";

export default {
  title: "Rua/PrimaryNav",
  component: NavItem,
} as Meta;

export const PrimaryNav = (args) => (
  <NavItem display="测试" href="#"/>
);
