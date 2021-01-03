import React from 'react';

interface Props {
    condition: boolean;
    wrapper: (children: React.ReactNode) => React.ReactElement;
}

export const ConditionalWrapper: React.FC<Props> = props => {
    const { condition, wrapper, children } = props;
    return condition ? wrapper(children) : <>{children}</>;
};

export default ConditionalWrapper;
