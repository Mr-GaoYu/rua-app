import React from "react";
import classNames from "classnames";
import ListItem from "src/components/core/ListItem";
import ListItemText from "src/components/core/ListItemText";
import { NavLink, NavLinkProps } from 'react-router-dom';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
  CSSProperties,
} from "src/components/core/styles";

type ClassNames = "menuItem" | 'active';

const styles = (theme: Theme) =>
  createStyles({
    menuItem: {
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      transition: theme.transitions.create(["color"]),
      color: theme.color.menuText,
      textDecoration: "none",
      fontSize: "0.9rem",
      maxHeight: 42,
      "&:hover,&:focus": {
        color: theme.color.menuActiveText,
      },
    },
    active: {
      color: theme.color.menuActiveText,
    }
  });


export interface Props extends NavLinkProps {
  disabled?: boolean;
  suffix?: JSX.Element;
  prefix?: any;
  prefixClasses?: string;
  suffixClasses?: string;
  key: string;
  title: string;
  onClick?: () => void;
}

export type CombinedProps = Props & WithStyles<ClassNames>;


const MenuItem: React.FC<CombinedProps> = (props) => {
  const {
    to,
    prefix,
    suffix,
    title,
    prefixClasses,
    suffixClasses,
    classes,
    ...rest
  } = props;

  return (
    <ListItem
      component={LinkItem}
      to={to}
      {...rest}
      button
      className={classNames({
        [classes.menuItem]: true,
        [classes.active]: true,
      })}
    >
      {prefix && (
        <div
          className={classNames({
            [prefixClasses]: true,
            prefix: true,
          })}
        >
          {prefix}
        </div>
      )}
      <ListItemText
        primary={title}
        disableTypography={true}
        className={classNames({
          textLink: true,
        })}
      />
      {suffix && (
        <div
          className={classNames({
            [suffixClasses]: true,
            suffix: true,
          })}
        >
          {suffix}
        </div>
      )}
    </ListItem>
  );
};

const styled = withStyles(styles);

export default styled(MenuItem);


export const LinkItem: React.ExoticComponent<NavLinkProps> = React.forwardRef(
  (props: NavLinkProps, ref: React.Ref<HTMLAnchorElement>) => (
    <NavLink exact {...props} innerRef={ref} />
  ))

