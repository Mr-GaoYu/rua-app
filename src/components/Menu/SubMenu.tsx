import React from "react";
import List from "src/components/core/List";
import ListItem from "src/components/core/ListItem";
import ListItemText from "src/components/core/ListItemText";
import ListItemIcon from "src/components/core/ListItemIcon";
import Collapse from "src/components/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import MenuItem, { MenuItemProps } from "./MenuItem";

import MenuContext from "./MenuContext";

export interface SubMenuProps {
  title?: string;
  eventKey?: string;
  disabled?: boolean;
  level?: number;
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
  const { eventKey, title, children } = props;
  const { openKeys, onOpenChange } = React.useContext(MenuContext);

  const isOpen = React.useMemo(() => openKeys.indexOf(eventKey) > -1, [
    openKeys,
  ]);

  return (
    <React.Fragment>
      <MenuItem title={title} key={eventKey} />
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children}
        </List>
      </Collapse>
    </React.Fragment>
  );
};

export default SubMenu;
