import React from "react";
import { WithComponentProps, RefForwardingComponent } from "src/@types/common";
import ListItem from "src/components/core/ListItem";
import { createStyles, makeStyles, Theme } from "src/components/core/styles";
import classNames from "classnames";
import { SelectEventHandler, MenuClickEventHandler, MenuHoverEventHandler, DestroyEventHandler } from './interface';
import { MenuContext, MenuContextType } from "./Menu";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        menuItem: {
            padding: "15px 30px",
            transition: theme.transitions.create(["all"]),
            backgroundColor: "transparent",
            color: "#6c757d",
            "& svg": {
                width: 20,
                height: 20,
                margin: "0 10px 0 3px",
            },
        },
    })
);
export interface MenuItemProps<T = string>
    extends WithComponentProps,
    Omit<React.HTMLAttributes<HTMLElement>,
    "onSelect" | 'onClick' | 'onMouseEnter' | 'onMouseLeave'> {
    /** The value of the current option */
    eventKey?: T;

    /** Diabled status */
    disabled?: boolean;

    /** Define menu indent width */
    indent?: number;

    /** Define the layer number of menu */
    level?: number;

    /** Define menuitem icon */
    expandIcon?: React.ReactElement;

    /** If true, the list item will be a button (using ButtonBase). 
     * Props intended for ButtonBase can then be applied to ListItem. */
    button?: boolean;

    multiple?: boolean;
    isSelected?: boolean;
    divider?: boolean;
    active?: boolean;
    onSelect?: SelectEventHandler<T>;
    onDeselect?: SelectEventHandler<T>;
    onClick?: MenuClickEventHandler<T>;
    onMouseEnter?: MenuHoverEventHandler<T>;
    onMouseLeave?: MenuHoverEventHandler<T>;
    onDestroy?: DestroyEventHandler;
}

const defaultProps: Partial<MenuItemProps> = {
    component: ListItem,
    prefixClass: "menu-item",
    button: false,
};

const MenuItem: RefForwardingComponent<
    typeof ListItem,
    MenuItemProps
> = React.forwardRef((props: MenuItemProps, ref: React.Ref<HTMLLIElement>) => {
    const {
        component: Component,
        onClick,
        onSelect,
        onDeselect,
        onMouseEnter,
        onMouseLeave,
        disabled,
        eventKey,
        isSelected,
        expandIcon,
        children,
        style,
        multiple,
        className,
        ...rest
    } = props;

    const { selectedKeys } = React.useContext<MenuContextType>(MenuContext);

    const classes = useStyles();

    const handleClick = React.useCallback(
        (event: React.MouseEvent<HTMLElement>) => {
            onClick?.(eventKey, event);

            if (multiple) {
                if (isSelected) {
                    onDeselect(eventKey, event, selectedKeys)
                } else {
                    onSelect?.(eventKey, event, selectedKeys);
                }
            } else if (!isSelected) {
                onSelect?.(eventKey, event, selectedKeys);
            }
        },
        [onSelect, eventKey, onClick, selectedKeys]
    );

    const handleMouseLeave = React.useCallback(
        (event: React.MouseEvent<HTMLElement>) => {
            onMouseEnter?.(eventKey, event);
        },
        [eventKey, onMouseLeave]
    );

    const handleMouseEnter = React.useCallback(
        (event: React.MouseEvent<HTMLElement>) => {
            onMouseEnter?.(eventKey, event);
        },
        [eventKey, onMouseEnter]
    );

    const handleKeyDown = React.useCallback(
        (event: React.KeyboardEvent<HTMLElement>) => {
            // const { code } = event;
            // if (code === code.ENTER) {
            //     onClick?.(eventKey, event as any);
            //     return true;
            //   }
        },
        [eventKey]
    );

    const mouseEvent = {
        onClick: !disabled ?? handleClick,
        onMouseLeave: !disabled ?? handleMouseLeave,
        onMouseEnter: !disabled ?? handleMouseEnter
    }

    return (
        <Component
            {...rest}
            {...mouseEvent}
            ref={ref}
            style={style}
            disableGutters
           
        >
            {expandIcon}
            {children}
        </Component>
    );
});

MenuItem.displayName = "MenuItem";
MenuItem.defaultProps = defaultProps;

export default MenuItem;
