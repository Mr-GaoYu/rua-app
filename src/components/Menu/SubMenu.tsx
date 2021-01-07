import React from "react";
import MenuItem from "./MenuItem";
import Collapse from "src/components/core/Collapse";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
export interface SubMenuProps {
  eventKey?: string;
  title: string;
  disabled?: boolean;
  component?: React.ExoticComponent;
  prepend?: JSX.Element;
  append?: JSX.Element;
  collapsed?: boolean;
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
  const { title, prepend, children, collapsed } = props;

  const append = props.append ? <ChevronRightIcon /> : <ExpandMoreIcon />;

  const [open, setOpen] = React.useState<boolean>(false);



  return (
    <React.Fragment>
      <MenuItem title={title} prepend={prepend} append={append} />
      <Collapse in={open}>{children}</Collapse>
    </React.Fragment>
  );
};

export default SubMenu;
