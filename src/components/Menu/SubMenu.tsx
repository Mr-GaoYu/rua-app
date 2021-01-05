import React from "react";
import ListItem from "src/components/core/ListItem";
import ListItemText from "src/components/core/ListItemText";
import ListItemIcon from "src/components/core/ListItemIcon";
import Collapse from "src/components/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import MenuItem from "./MenuItem";
import { NavLink, NavLinkProps } from 'react-router-dom';

interface Props extends NavLinkProps {
  children: JSX.Element | JSX.Element[];
  key?: string
}

type CombinedProps = Props;

const SubMenu: React.FC<CombinedProps> = (props) => {
  const { title, children, key } = props;

  const PrefixComponent = () => <div className="circle"></div>;

  return (
    <React.Fragment>
      <MenuItem
        title={title}
        key={key}
        to="/vv"
      />
      <Collapse in={true} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </React.Fragment>
  );
};

export default SubMenu;
