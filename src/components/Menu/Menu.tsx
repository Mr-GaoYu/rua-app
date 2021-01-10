import React from 'react';
import List from 'src/components/core/List';
import { WithComponentProps, RefForwardingComponent } from 'src/@types/common';

export interface MenuProps<T = string> extends WithComponentProps {
    collapse?: boolean;
    defaultOpenKeys?: T[];
    openKeys?: T[];
    defaultSelectedKeys?: T[];
    selectedKeys?: T[];
    onOpenChange?: (openKeys: T[], event: React.SyntheticEvent) => void;
    onSelect?: (eventKey: T, event: React.SyntheticEvent) => void;
}

export interface MenuContextType<T = string> {
    selectedKeys?: T[];
    openKeys?: T[];
    collapsed?: boolean;
}

export const MenuContext = React.createContext(null);

const defaultProps: Partial<MenuProps> = {
    component: List,
    prefixClass: 'menu',

};

const Menu: RefForwardingComponent<typeof List, MenuProps> = React.forwardRef(
    (props: MenuProps, ref: React.Ref<HTMLLIElement>) => {
        const { component: Component } = props;

        const handleOpenChange = React.useCallback((eventKey: any, event: React.MouseEvent) => {

        }, [])

        const contextValue = React.useMemo(() => { }, [])

        return (
            <MenuContext.Provider value={contextValue}>
                <Component />
            </MenuContext.Provider>
        )
    }
)

Menu.displayName = 'Menu';
Menu.defaultProps = defaultProps;

export default Menu;