import React from "react";
import Popover from "src/components/core/Popover";
import { toArray } from "./utils";

export interface SubPopupMenuProps {
  visible?: boolean;
  eventKey?: React.Key;
}

const SubPopupMenu: React.FC<SubPopupMenuProps> = (props) => {
  const { visible } = props;

  const renderMenuItem = (c: React.ReactElement, i: number) => {
    return c;
  };

  return (
    <React.Fragment>
      {props.children}
      <Popover
        id="mouse-over-popover"
        open={false}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {toArray(props.children).map((c: React.ReactElement, i) =>
          renderMenuItem(c, i)
        )}
      </Popover>
    </React.Fragment>
  );
};

export default SubPopupMenu;
