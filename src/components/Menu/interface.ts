export interface MenuInfo {
  key: React.Key;
  keyPath: React.Key[];
  item: React.ReactInstance;
  domEvent: React.MouseEvent<HTMLElement>;
}

export interface SelectInfo extends MenuInfo {
  selectedKeys?: React.Key[];
}

export type MenuClickEventHandler = (info: MenuInfo) => void;

export type SelectEventHandler = (info: SelectInfo) => void;

export type RenderIconType =
  | React.ReactNode
  | ((props: any) => React.ReactNode);

export type OpenEventHandler = (
  keys:
    | React.Key[]
    | {
      key: React.Key;
      item: React.ReactInstance;
    },
) => void;