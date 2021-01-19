import React from "react";

export type Key = React.Key;

export type HoverEventHandler = (info: { key: Key; hover: boolean }) => void;

export type RenderIconType =
  | React.ReactNode
  | ((props: any) => React.ReactNode);
