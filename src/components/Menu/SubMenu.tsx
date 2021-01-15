import React from "react";
import classNames from "classnames";
import { WithComponentProps, RefForwardingComponent } from "src/@types/common";
import { makeStyles, createStyles, Theme } from "src/components/core/styles";
import SafeAnchor from "src/components/SafeAnchor";
import Collapse from "src/components/core/Collapse";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    subMenu: {
      listStyle: "none",
    },
    navLink: {
      color: "#6c757d",
      padding: "15px 30px",
      position: "relative",
      transition: "all .4s",
      display: "block",
      outline: 0,
      textDecoration: "none",
      "& span": {
        verticalAlign: "middle",
      },
      "&:hover": {
        color: "#727cf5",
      },
    },
    collapse: {
      "& $navLink": {
        padding: "15px 20px",
        minHeight: 56,
        "& span": {
          display: "none",
        },
        "&:hover": {
          position: "relative",
          width: 260,
          background: "#fff",
          "& span": {
            display: "inline",
          },
          "&>$secondMenu":{

          }
        },
      },
    },
    secondMenu: {
      position: "absolute",
      left: 70,
      width: 190,
      zIndex: 99999,
      backgroundColor: "#fff",
    },
  })
);

export interface SubMenuProps
  extends WithComponentProps,
    React.HtmlHTMLAttributes<HTMLElement> {
  collapse?: boolean;
}

const defaultProps: Partial<SubMenuProps> = {
  component: "li",
};

const SubMenu: RefForwardingComponent<"li", SubMenuProps> = React.forwardRef(
  (props: SubMenuProps, ref: React.Ref<HTMLElement>) => {
    const { component: Component, collapse, className, children } = props;
    const classes = useStyles();

    return (
      <Component
        ref={ref}
        className={classNames(className, {
          [classes.subMenu]: true,
          [classes.collapse]: collapse,
        })}
      >
        <SafeAnchor
          className={classNames({
            [classes.navLink]: true,
          })}
        >
          <span>aaaaa</span>
        </SafeAnchor>
        <Collapse
          in={true}
          className={classNames({
            [classes.navLink]: true,
          })}
        >
          {children}
        </Collapse>
      </Component>
    );
  }
);

SubMenu.defaultProps = defaultProps;
SubMenu.displayName = "SubMenu";

export default SubMenu;
