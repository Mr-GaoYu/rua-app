import React from 'react';
import { WithComponentProps, RefForwardingComponent } from 'src/@types/common';
import SafeAnchor from 'src/components/SafeAnchor';

export interface MenuItemProps<T = string> extends WithComponentProps,
    Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'> {
    active?: boolean;
    disabled?: boolean;
    divider?: boolean;
    icon?: React.ReactElement;
    eventKey?: T;
    hasPopover?: boolean;
    href?: string;
    linkAs?: React.ElementType;
    onSelect?: (eventKey: T, event: React.SyntheticEvent) => void;
    renderItem?: (item: React.ReactNode) => React.ReactNode;
}

const MenuItem: RefForwardingComponent<'li', MenuItemProps> = React.forwardRef(
    (props: MenuItemProps, ref: React.Ref<HTMLLIElement>) => {
        return (
            <div>2</div>
        )
    }
)

MenuItem.displayName = 'MenuItem'

export default MenuItem