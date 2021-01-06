import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import Menu from "./Menu";
import MenuItem, { MenuItemProps } from "./MenuItem";
import SubMenu from "./SubMenu";

export default {
  title: "Rua/Menu",
  component: Menu,
} as Meta;

const menus = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "CRM",
    href: "/crm",
    activeLinks: ["/crm", "/crm/settings"],
  },
  {
    title: "UI Kit",
    menus: [
      {
        title: "Cards",
        href: "/crm/dashboard",
      },
      {
        title: "Buttons",
        href: "/crm/buttons",
      },
    ],
  },
];

interface SidebarNavItemProps extends MenuItemProps {
  menus?: MenuItemProps[];
}

const SidebarNavItem: React.FC<SidebarNavItemProps> = (props) => {
  const { menus = [], title, href, ...rest } = props;
  const hasChildren = menus && menus.length > 0;

  return hasChildren ? (
    <SubMenu title={title} {...rest}>
      {menus.map((menu) => (
        <SidebarNavItem {...menu} />
      ))}
    </SubMenu>
  ) : (
    <MenuItem title={title} href={href} {...rest} />
  );
};

export const PrimaryNav = () => {
  return (
    <Menu selectedKeys={["UI Kit", "Cards"]}>
      {menus.map((menu) => (
        <SidebarNavItem {...menu} />
      ))}
    </Menu>
  );
};
