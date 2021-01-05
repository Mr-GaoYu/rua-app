import React from "react";
import MenuItem from "./MenuItem";
import SubMenu from "./SubMenu";
import useStyles from "./Menu.styles";
import DeleteIcon from "@material-ui/icons/Delete";

interface Props {
  defaultOpenKeys?: string[];
  defaultSelectedKeys?: string[];
  openKeys?: string[];
  selectedKeys?: string[];
 
}

const Menu: React.FC = (props) => {
  const classes = useStyles();

  return (
    <SubMenu title="仪表盘" key="as" to="/ass">
      <MenuItem title="仪表盘" key="asa" to="/a" />
      <MenuItem title="仪表盘" key="ass" to="/b" />
    </SubMenu>
  );
};

export default Menu;
