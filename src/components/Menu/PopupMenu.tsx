import React from "react";
import Popover from "src/components/core/Popover";
import { TriggerAction } from "./interface";

export interface PopupMenuProps {
  trigger?: TriggerAction;
}

const PopupMenu: React.FC<PopupMenuProps> = (props) => {
  const { children } = props;

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [node, setNode] = React.useState(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const renderPopupChildren = (children: React.ReactNode, cb?: any) => {
    return React.Children.map(children, (child: any, index: number) => {
      return React.cloneElement(child, {
        key: index,
        onClick: (event: any) => {
          setNode(child);
          handlePopoverOpen(event);
        },
      });
    });
  };

  return (
    <React.Fragment>
      {renderPopupChildren(children)}
      <Popover
        open={open}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {node}
      </Popover>
    </React.Fragment>
  );
};

export default PopupMenu;
