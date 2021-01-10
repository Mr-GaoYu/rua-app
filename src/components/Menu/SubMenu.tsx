import React from 'react';
import PropTypes from 'prop-types';
import MenuToggle from './MenuToggle';
import { WithComponentProps, RefForwardingComponent } from 'src/@types/common';

export interface SubMenuProps<T = string> extends WithComponentProps,
    Omit<React.HTMLAttributes<HTMLElement>, 'onSelect' | 'title'> {
    /** Define this title as a submenu */
    title?: React.ReactNode;
    /** Define this icon */
    icon?: React.ReactElement;
}

const SubMenu: RefForwardingComponent<'li', SubMenuProps> = React.forwardRef(
    (props: SubMenuProps, ref: React.Ref<HTMLLIElement>) => {

        const overlayTarget = React.useRef();
        const triggerTarget = React.useRef();

        const toggleElement = (
            <MenuToggle ref={triggerTarget} button>

            </MenuToggle>
        )

        return (
            <div>2</div>
        )
    }
)

SubMenu.displayName = "SubMenu"

export default SubMenu