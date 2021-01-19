import React from "react";
import { RefForwardingComponent, WithComponentProps } from "src/@types/common";
import classNames from "classnames";
import useStyles from "./Menu.styles";
import SafeAnchor from "src/components/SafeAnchor";
import { Key } from "./Menu";

export interface SubMenuProps
  extends WithComponentProps,
    Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
  className?: string;

  style?: React.CSSProperties;

  children?: React.ReactNode;

  eventKey?: Key;

}

const defaultProps: Partial<SubMenuProps> = {
  component: "li",
};

const SubMenu: RefForwardingComponent<"li", SubMenuProps> = React.forwardRef(
  (props: SubMenuProps, ref: React.Ref<HTMLElement>) => {
    const {
      component: Component,
      className,
      style,
      children
    } = props;
    const classes = useStyles();



    return (
      <Component
        ref={ref}
        style={style}
        className={classNames(className, {
          [classes.menuItem]: true,
        })}
      >
        <SafeAnchor
          className={classNames(className, {
            [classes.itemLink]: true,
          })}
        >
          1111
        </SafeAnchor>
        
      </Component>
    );
  }
);

SubMenu.defaultProps = defaultProps;
SubMenu.displayName = "SubMenu";

export default SubMenu;
