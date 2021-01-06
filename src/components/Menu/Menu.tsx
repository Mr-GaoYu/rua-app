import React from "react";
import MenuContext, { MenuContextProps } from "./MenuContext";
import {
  MenuClickEventHandler,
  SelectEventHandler,
  SelectInfo,
} from "./interface";

interface MenuProps extends MenuContextProps { }

const Menu: React.FC<MenuProps> = (props) => {
  const {
    selectable = true,
    multiple,
    defaultSelectedKeys = [],
    defaultOpenKeys = [],
    children,
  } = props;

  const [selectedKeys, setSelectedKeys] = React.useState<React.Key[]>(() => {
    if ("selectedKeys" in props) {
      return props.selectedKeys || [];
    }
    return defaultSelectedKeys;
  });
  const [openKeys, setOpenKeys] = React.useState(() => {
    if ("openKeys" in props) {
      return props.openKeys || [];
    }
    return defaultOpenKeys;
  });

  const onClick: MenuClickEventHandler = (e) => {
    props.onClick(e);
  };

  const onSelect: SelectEventHandler = (selectInfo) => {
    if (selectable) {
      const selectedKey = selectInfo.key;
      if (multiple) {
        setSelectedKeys(selectedKeys.concat([selectedKey]));
      } else {
        setSelectedKeys([selectedKey]);
      }

      props.onSelect({
        ...selectInfo,
        selectedKeys,
      });
    }
  };

  const onOpenChange = event => {
    if (Array.isArray(event)) {

    }else{
      
    }
  };

  const onDeselect = () => { };

  return (
    <MenuContext.Provider
      value={{
        ...props,
        onClick,
        onSelect,
        onOpenChange,
        onDeselect,
        selectedKeys,
        openKeys
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export default Menu;
