import React from "react";
import PropTypes from "prop-types";
import { WithComponentProps, RefForwardingComponent } from "src/@types/common";
import useControlled from "src/hooks/useControlled";
import { omit, equals, remove } from "ramda";
import { SelectEventHandler, MenuClickEventHandler } from "./interface";
import PopupMenu from "./PopupMenu";

export interface MenuProps<T = string> extends WithComponentProps {
    /** Whether the menu is in the folded state */
    collapsed?: boolean;

    /** Whether multiple selections are allowed */
    multiple?: boolean;

    /** Define menu indent width */
    indent?: number;

    /** Define the layer number of menu */
    level?: number;

    /** Is it allowed to select */
    selectable?: boolean;

    /** Whether to keep only one submenu open */
    uniqueOpened?: boolean;

    /** Submenu expand whether to activate the first */
    defaultActiveFirst?: boolean;

    /** Define the initial selected Submenu EventKey */
    defaultOpenKeys?: T[];

    /** Defines the currently expanded Submenu EventKey */
    openKeys?: T[];

    /** Define the initial selected MenuItem EventKey */
    defaultSelectedKeys?: T[];

    /** Defines the currently expanded MenuItem EventKey */
    selectedKeys?: T[];

    /** Defines the currently active menu item */
    activeKey?: T;

    /** called when open/close submenu */
    onOpenChange?: (openKeys: T[]) => void;

    /** called when select a menuitem */
    onSelect?: SelectEventHandler<T>;

    /** called when deselect a menu item. only called when allow multiple */
    onDeselect?: SelectEventHandler<T>;

    /** called when click a menu item */
    onClick?: MenuClickEventHandler<T>;
}

export interface MenuContextType<T = string> {
    selectedKeys?: T[];
    openKeys?: T[];
}

export const MenuContext = React.createContext(null);

const defaultProps: Partial<MenuProps> = {
    component: PopupMenu,
    prefixclass: "menu",
    selectable: true,
    defaultOpenKeys: [],
    defaultSelectedKeys: [],
};

const Menu: RefForwardingComponent<
    typeof PopupMenu,
    MenuProps
> = React.forwardRef((props: MenuProps, ref: React.Ref<HTMLLIElement>) => {
    const {
        component: Component,
        openKeys: openKeysProp,
        defaultOpenKeys,
        selectedKeys: selectedKeysProps,
        defaultSelectedKeys,
        uniqueOpened,
        selectable,
        multiple,
        onOpenChange,
        onSelect,
        onDeselect,
        onClick,
    } = props;

    const [openKeys, setOpenKeys] = useControlled(openKeysProp, defaultOpenKeys);
    const [selectedKeys, setSelectedKeys] = useControlled(
        selectedKeysProps,
        defaultSelectedKeys
    );

    const handleOpenChange = React.useCallback(
        (eventKey: string, event: React.MouseEvent) => {
            const index = openKeys.indexOf(eventKey);
            let nextOpenKeys = [...openKeys];
            if(index !== -1){
                nextOpenKeys.splice(index, 1);
            }else{
                nextOpenKeys.push(eventKey);
            }

            setOpenKeys(nextOpenKeys);
            onOpenChange?.(nextOpenKeys);
        },
        [onOpenChange, openKeys, setOpenKeys]
    );

    const handleSelect = React.useCallback(
        (eventKey: string, event: React.MouseEvent) => {
            if (selectable) {
                let nextSelectedKeys = [...selectedKeys];
                if (multiple) {
                    nextSelectedKeys = nextSelectedKeys.concat([eventKey]);
                } else {
                    nextSelectedKeys = [eventKey];
                }
                setSelectedKeys(nextSelectedKeys);
                onSelect?.(eventKey, event, nextSelectedKeys);
            }
        },
        [multiple, onSelect, selectable, selectedKeys, setSelectedKeys]
    );

    const handleDeselect = React.useCallback(
        (eventKey: string, event: React.MouseEvent) => {
            if (selectable) {
                let nextSelectedKeys = [...selectedKeys];
                const index = nextSelectedKeys.indexOf(eventKey);
                if (index !== -1) {
                    nextSelectedKeys.splice(index, 1);
                }
                setSelectedKeys(nextSelectedKeys);
                onDeselect?.(eventKey, event, nextSelectedKeys);
            }
        },
        [onDeselect, selectable, selectedKeys, setSelectedKeys]
    );

    const handleClick = React.useCallback(
        (eventKey: string, event: React.MouseEvent) => {
            onClick?.(eventKey, event);
        },
        [onClick]
    );

    const contextValue = React.useMemo(
        () => ({
            selectedKeys,
            openKeys,
        }),
        [selectedKeys, openKeys]
    );

    const mouseEvent = {
        onClick: handleClick,
        onOpenChange: handleOpenChange,
        onSelect: handleSelect,
        onDeselect: handleDeselect,
    };

    return (
        <MenuContext.Provider value={contextValue}>
            <Component
                {...omit(
                    ["onClick", "onOpenChange", "onSelect", "onDeselect", "component"],
                    props
                )}
                {...mouseEvent}
            />
        </MenuContext.Provider>
    );
});

Menu.displayName = "Menu";
Menu.defaultProps = defaultProps;
Menu.propTypes = {
    component: PropTypes.elementType,
    collapsed: PropTypes.bool,
    multiple: PropTypes.bool,
    indent: PropTypes.number,
    level: PropTypes.number,
    selectable: PropTypes.bool,
    uniqueOpened: PropTypes.bool,
    defaultActiveFirst: PropTypes.bool,
    defaultOpenKeys: PropTypes.array,
    openKeys: PropTypes.array,
    defaultSelectedKeys: PropTypes.array,
    selectedKeys: PropTypes.array,
    activeKey: PropTypes.string,
    onOpenChange: PropTypes.func,
    onSelect: PropTypes.func,
    onDeselect: PropTypes.func,
    onClick: PropTypes.func,
};

export default Menu;
