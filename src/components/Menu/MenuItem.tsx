import React from "react";
import classNames from "classnames";
import ListItemText from "src/components/core/ListItemText";
import { Link } from 'react-router-dom';
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
    active:{
      color: theme.color.menuActiveText,
    }
  });

interface Props extends PrimaryLink {
  prefixClasses?: string;
  suffixClasses?: string;
}

export interface PrimaryLink {
  href?: string;
  disabled?: boolean;
  prefix?: JSX.Element;
  suffix?: JSX.Element;
  key: string;
  title: string;
  onClick?: () => void;
}

export type CombinedProps = Props & WithStyles<ClassNames>;

const MenuItem: React.FC<CombinedProps> = (props) => {
  const {
    href,
    prefix,
    suffix,
    title,
    prefixClasses,
    suffixClasses,
    classes,
  } = props;

  return (
    <Link
      to={href}
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
    </Link>
  );
};

const styled = withStyles(styles);

export default styled(MenuItem);
