import React from "react";
import ListItem from "src/components/core/ListItem";
import ListItemIcon from "src/components/core/ListItemIcon";
import ListItemText from "src/components/core/ListItemText";
import { Link } from "react-router-dom";

interface Props extends PrimaryLink {
  href?: string;
  isCollapsed?: boolean;
  //   closeMenu: () => void;
  //   linkClasses: (href?: string) => string;
  //   listItemClasses: string;
}

export interface PrimaryLink {
  href?: string;
  onClick?: () => void;
  //   QAKey: string;
  display: string;
  icon?: JSX.Element;
  isDisabled?: () => boolean | boolean;
}

export type CombinedProps = Props;

const NavItem: React.FC<CombinedProps> = (props) => {
  const { href, icon } = props;

  return (
    <React.Fragment>
      {href ? (
        <Link to={href}>
          {icon && <ListItemIcon>{icon}</ListItemIcon>}
          <ListItemText primary="Spam" disableTypography={true} />
        </Link>
      ) : null}
    </React.Fragment>
  );
};

export default NavItem;
