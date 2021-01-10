import React from 'react';
import { WithComponentProps, RefForwardingComponent } from 'src/@types/common';
import ListItem from 'src/components/core/ListItem';

export interface MenuToggleProps<T = string> extends WithComponentProps {
    icon?: React.ReactElement;
}

const defaultProps: Partial<MenuToggleProps> = {
    component: ListItem,
    prefixClass: 'menu-toggle'
};

const MenuToggle: RefForwardingComponent<typeof ListItem, MenuToggleProps> = React.forwardRef(
    (props: MenuToggleProps, ref: React.Ref<HTMLLIElement>) => {
        const { component: Component, children, icon, ...rest } = props;

        return (
            <Component ref={ref} {...rest}>
                {icon}
                {children}
            </Component>
        )
    }
)

MenuToggle.displayName = "MenuToggle";
MenuToggle.defaultProps = defaultProps;

export default MenuToggle