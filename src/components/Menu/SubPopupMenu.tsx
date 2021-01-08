import React from "react";
import Popover from "src/components/core/Popover";
import { toArray } from "./utils";

export interface SubPopupMenuProps {
  level?: number;
  indent?: 30;
}

const SubPopupMenu: React.FC<SubPopupMenuProps> = (props) => {
  const renderMenuItem = (child: React.ReactElement, i: number) => {
    if (!child) {
      return null;
    }

    const newChildProps = {}

    return React.cloneElement(child,{
        ...newChildProps,
        key: i
    })
  };

  return <React.Fragment></React.Fragment>;
};

export default SubPopupMenu;
