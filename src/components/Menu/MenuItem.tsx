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

export interface MenuItemProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  prepend?: JSX.Element;
  append?: JSX.Element;
  onClick?: any;
  collapsed?: boolean;
  indent?: number;
  level?: number;
  eventKey?: React.Key;
  component?: React.ElementType;
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { title, prepend, append, onClick, collapsed, component } = props;
  const classes = useStyles();

  const style = {
    ...props.style,
    paddingLeft: props.indent * props.level,
  };

  return (
    <React.Fragment>
      <ListItem
        className={classNames({
          [classes.menuItem]: true,
        })}
        button
        component={component}
        disableGutters={true}
        onClick={onClick}
        style={style}
      >
        {prepend && <div className="prepend">{prepend}</div>}
        <ListItemText primary={title} disableTypography={true} />
        {append && <div className="append">{append}</div>}
      </ListItem>
    </React.Fragment>
  );
};

MenuItem.defaultProps = {
  indent: 30,
  level: 1,
};

export default MenuItem;
