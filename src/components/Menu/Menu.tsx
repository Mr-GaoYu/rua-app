import React from "react";
import MenuContext from "./MenuContext";
import SubPopupMenu from "./SubPopupMenu";
import {
  MenuClickEventHandler,
  SelectInfo,
  SelectEventHandler,
} from "./interface";
import { noop } from "./utils";

export interface MenuProps {
  openKeys?: string[];
  selectedKeys?: React.Key[];
  onOpenChange?: (openKeys: React.Key[]) => void;
  onSelect?: SelectEventHandler;
  onClick?: MenuClickEventHandler;
  onDeselect?: SelectEventHandler;
  selectable?: boolean;
  defaultSelectedKeys?: string[];
  defaultOpenKeys?: string[];
  multiple?: boolean;
  collapsed?: boolean;
  indent?: number;
  uniqueOpened?: boolean;
  activeKey?: string;
  defaultActiveFirst?: boolean;
  style?: React.CSSProperties;

}

const Menu: React.FC<MenuProps> = (props) => {
  const [openKeys, setOpenKeys] = React.useState(() => {
    if ("openKeys" in props) {
      return props.openKeys || [];
    }
    return props.defaultOpenKeys;
  });
  const [selectedKeys, setSelectedKeys] = React.useState(() => {
    if ("selectedKeys" in props) {
      return props.selectedKeys || [];
    }
    return props.defaultSelectedKeys;
  });

  const onSelect = (selectInfo: SelectInfo) => {
    const { selectable, multiple } = props;
    if (selectable) {
      const selectedKey = selectInfo.key;
      let newSelectedKeys = selectedKeys.concat();

      if (multiple) {
        newSelectedKeys = newSelectedKeys.concat([selectedKey]);
      } else {
        newSelectedKeys = [selectedKey];
      }
      if (!("selectedKeys" in props)) {
        setSelectedKeys(newSelectedKeys);
      }
      props.onSelect({
        ...selectInfo,
        selectedKeys,
      });
    }
  };

  const onDeselect = (selectInfo: SelectInfo) => {
    const { selectable } = props;

    if (selectable) {
      let newSelectedKeys = selectedKeys.concat();
      const selectedKey = selectInfo.key;
      const index = newSelectedKeys.indexOf(selectedKey);

      if (index !== -1) {
        newSelectedKeys.splice(index, 1);
      }
      if (!("selectedKeys" in props)) {
        setSelectedKeys(newSelectedKeys);
      }

      props.onDeselect({
        ...selectInfo,
        selectedKeys,
      });
    }
  };

  const onClick: MenuClickEventHandler = (e) => {
    const { onOpenChange } = props;
    if (!("openKeys" in props)) {
      setOpenKeys([]);
      onOpenChange([]);
    }
    props.onClick(e);
  };

  const onOpenChange = (event) => {
    let newOpenKeys = openKeys.concat();

    if (Array.isArray(event)) {
    }
  };


  return (
    <MenuContext.Provider
      value={{
        selectedKeys,
        openKeys,
      }}
    >
      <SubPopupMenu>{props.children}</SubPopupMenu>
    </MenuContext.Provider>
  );
};

Menu.defaultProps = {
  defaultSelectedKeys: [],
  defaultOpenKeys: [],
  onClick: noop,
  onSelect: noop,
  onDeselect: noop,
};

export default Menu;
