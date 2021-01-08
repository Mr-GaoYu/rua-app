import React from "react";
import MenuItem from "./MenuItem";
import Collapse from "src/components/core/Collapse";
import List from "src/components/core/List";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

interface SubMenuProps {
  eventKey?: string;
  disabled?: boolean;
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
  const { children } = props;

  const [open, setOpen] = React.useState(true);

  const onClick = () => {
    setOpen(!open);
  };

  const appendIcon = open ? <ExpandLess /> : <ExpandMore />;

  return (
    <React.Fragment>
      <MenuItem title="UI Kit" append={appendIcon} onClick={onClick}/>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children}
        </List>
      </Collapse>
    </React.Fragment>
  );
};

export default SubMenu;
