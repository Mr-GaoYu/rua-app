import React from 'react';

export type DestroyEventHandler = (key: React.Key) => void;

export type MenuClickEventHandler<T> = (
  eventKey: T,
  event: React.SyntheticEvent
) => void

export type MenuHoverEventHandler<T> = (
  eventKey: T,
  event: React.MouseEvent<HTMLElement>
) => void;

export type SelectEventHandler<T> = (
  eventKey: T,
  event: React.SyntheticEvent,
  selectedKeys: T[],
) => void

export interface StandardProps {
  prefixClass?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export interface WithAsProps<Component extends React.ElementType | string = React.ElementType>
  extends StandardProps {
  component?: Component;
}

export interface RefForwardingComponent<T extends React.ElementType, P = unknown> {
  <Component extends React.ElementType = T>(
    props: React.PropsWithChildren<WithAsProps<Component> & P>,
    context?: any
  ): React.ReactElement | null;
  propTypes?: any;
  contextTypes?: any;
  defaultProps?: Partial<P>;
  displayName?: string;
}