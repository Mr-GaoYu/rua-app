import React from "react";
import { MenuClickEventHandler, SelectEventHandler } from "./interface";

export interface MenuContextProps {
  /**
   * 菜单是否收起状态
   */
  collapsed?: boolean;
  /**
   * 菜单缩进宽度
   */
  indent?: number;
  /**
   * SubMenu 展开/关闭的回调
   */
  onOpenChange?: (openKeys: React.Key[]) => void;
  /**
   * 取消选中时调用，仅在 multiple 生效
   */
  onDeselect?: SelectEventHandler;
  /**
   * 被选中时调用
   */
  onSelect?: SelectEventHandler;
  /**
   * 点击 MenuItem 调用此函数
   */
  onClick?: MenuClickEventHandler;

  /**
   * 初始展开的 SubMenu 菜单项 key 数组
   * @default []
   */
  defaultOpenKeys?: string[];
  /**
   * 当前展开的 SubMenu 菜单项 key 数组
   */
  openKeys?: string[];


  /**
   * 初始选中的菜单项 key 数组
   * @default []
   */
  defaultSelectedKeys?: string[];
  /**
   * 当前选中的菜单项 key 数组
   */
  selectedKeys?: React.Key[];
  /**
   * 允许选择菜单
   * @default true
   */
  selectable?: boolean;
  /**
   * 是否允许多重选择
   */
  multiple?: boolean;
  /**
   * 是否只保持一个子菜单的展开
   * @default true
   */
  uniqueOpened?: boolean;
  /**
   * 初始和当前活动菜单项的键
   */
  activeKey?: string;
  /**
   * 显示时是否激活第一个菜单项
   * @default false
   */
  defaultActiveFirst?: boolean;
}

const MenuContext = React.createContext<MenuContextProps>({});

export default MenuContext;
