import React from "react";

export type Key = React.Key;

export interface MenuInfo {
  key?: Key;

  keyPath?: Key[];

  domEvent: React.MouseEvent<HTMLElement>;
}

export interface SelectInfo extends MenuInfo {
  selectedKeys?: React.Key[];
}

export type SelectEventHandler = (info: SelectInfo) => void;

export type DestroyEventHandler = (key: React.Key) => void;

export type HoverEventHandler = (info: {
  key: React.Key;
  hover: boolean;
}) => void;

export type MenuHoverEventHandler = (info: {
  key: React.Key;
  domEvent: React.MouseEvent<HTMLElement>;
}) => void;

export type MenuClickEventHandler = (info: MenuInfo) => void;

export type OpenEventHandler = (
  keys:
    | React.Key[]
    | {
        key: Key;
        trigger: string;
        open: boolean;
      }
) => void;

export type TriggerSubMenuAction = "click" | "hover";
