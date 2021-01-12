import React from 'react';
import { Omit } from './utils';

export interface StandardProps {
    prefixclass?: string;

    className?: string;

    children?: React.ReactNode;

    style?: React.CSSProperties;
}

export interface WithComponentProps<Component extends React.ElementType | string = React.ElementType>
    extends StandardProps {
    component?: Component
}

export type ReplaceProps<Inner extends React.ElementType, P> = Omit<
    React.ComponentPropsWithRef<Inner>,
    P
> &
    P;

export interface RefForwardingComponent<T extends React.ElementType, P = unknown> {
    <Component extends React.ElementType = T>(
        props: React.PropsWithChildren<ReplaceProps<Component, WithComponentProps<Component> & P>>,
        context?: any
    ): React.ReactElement | null;
    propTypes?: any;
    contextTypes?: any;
    defaultProps?: Partial<P>;
    displayName?: string;
}

