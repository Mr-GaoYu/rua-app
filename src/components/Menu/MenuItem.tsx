import React from "react";
import classNames from "classnames";
import ListItem, { ListItemProps } from "src/components/core/ListItem";
import ListItemText from "src/components/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Popover from "src/components/core/Popover";
import { NavLink, NavLinkProps } from "react-router-dom";
import { makeStyles, createStyles, Theme } from "src/components/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuItem: {
      whiteSpace: "nowrap",
      padding: "15px 30px",
      color: "#6c757d",
      "& .prepend,& .append": {
        lineHeight: 0,
        "& svg": {
          width: 20,
          height: 20,
          margin: "0 10px 0 3px",
        },
      },
      "&:hover": {
        color: "#727cf5",
      },
    },
  })
);

export interface MenuItemProps {
  title: string;
  href?: string;
  prepend?: JSX.Element;
  append?: JSX.Element;
  onClick?: any;
  collapsed?: boolean;
}

export interface ListItemLinkProps extends NavLinkProps {}

export interface ListItemComponentProps
  extends React.HTMLAttributes<HTMLElement> {
  href?: string | null;
  collapsed?: boolean;
}

export const ListItemLink: React.ExoticComponent<NavLinkProps> = React.forwardRef(
  (props: ListItemLinkProps, ref: React.Ref<HTMLAnchorElement>) => (
    <NavLink exact {...props} innerRef={ref} />
  )
);

export const ListItemComponent: React.ExoticComponent<ListItemComponentProps> = React.forwardRef(
  (props: ListItemComponentProps, ref: React.Ref<HTMLDivElement>) => {
    const { collapsed, ...rest } = props;

    const component =
      typeof props.href === "string" ? (
        <ListItem
          {...rest}
          disableGutters={true}
          button
          component={ListItemLink}
          to={props.href}
        />
      ) : (
        <ListItem {...rest} disableGutters={true} button />
      );

    return <div ref={ref}>{component}</div>;
  }
);

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { title, href, prepend, append, onClick, collapsed } = props;
  const classes = useStyles();
  return (
    <React.Fragment>
      <ListItemComponent
        className={classNames({
          [classes.menuItem]: true,
        })}
        href={href}
        onClick={onClick}
        collapsed={collapsed}
      >
        {prepend && <div className="prepend">{prepend}</div>}
        <ListItemText primary={title} disableTypography={true} />
        {append && <div className="append">{append}</div>}
      </ListItemComponent>
      <Popover
        open={false}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        The content of the Popover.
      </Popover>
    </React.Fragment>
  );
};

export default MenuItem;
