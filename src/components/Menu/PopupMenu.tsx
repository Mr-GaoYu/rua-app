import React from 'react';
import { WithComponentProps, RefForwardingComponent } from 'src/@types/common';
import Collapse from 'src/components/core/Collapse';

export interface PopupMenuProps extends WithComponentProps {

}

const defaultProps: Partial<PopupMenuProps> = {
    component: Collapse,
    prefixClass: 'popup-menu'
};

const PopupMenu: RefForwardingComponent<typeof Collapse, PopupMenuProps> = React.forwardRef(
    (props: PopupMenuProps, ref: React.Ref<HTMLLIElement>) => {
        const { component: Component, children, ...rest } = props;

        const renderMenuItems = React.Children.map(children, (item: any, index: number) => {
            if (!item) {
                return null;
            }

            const displayName = item?.type?.displayName;


            if (displayName === 'SubMenu' || displayName === 'MenuItem') { }


            if (displayName === 'MenuItem') {

            }

            if (displayName === 'SubMenu') {

            }
        })

        return (
            <div>2</div>
        )
    }
)

PopupMenu.displayName = "PopupMenu";
PopupMenu.defaultProps = defaultProps;

export default PopupMenu