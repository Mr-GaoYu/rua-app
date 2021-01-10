import React from 'react';
import PropTypes from 'prop-types';
import { WithComponentProps, RefForwardingComponent } from 'src/@types/common';

export interface SafeAnchorProps extends WithComponentProps,
    React.HTMLAttributes<HTMLAnchorElement> {
    href?: string;
    disabled?: boolean;

}

const SafeAnchor: RefForwardingComponent<'a', SafeAnchorProps> = React.forwardRef(
    (props: SafeAnchorProps, ref: React.Ref<HTMLAnchorElement>) => {
        const { component: Component = 'a', disabled, onClick, ...rest } = props;

        const handleClick = React.useCallback(
            (event: React.MouseEvent<HTMLAnchorElement>) => {
                if (disabled) {
                    event.preventDefault();
                    event.stopPropagation();
                    return;
                }

                onClick?.(event);
            },
            [onClick, disabled]
        );

        if (disabled) {
            rest.tabIndex = -1;
            rest['aria-disabled'] = true;
        }

        return <Component {...rest} ref={ref} onClick={handleClick} />;
    }
)

SafeAnchor.displayName = 'SafeAnchor';
SafeAnchor.propTypes = {
    disabled: PropTypes.bool,
    component: PropTypes.elementType
};

export default SafeAnchor