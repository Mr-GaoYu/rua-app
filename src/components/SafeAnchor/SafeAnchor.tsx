import React from "react";
import { WithComponentProps, RefForwardingComponent } from "src/@types/common";

export interface SafeAnchorProps
  extends WithComponentProps,
    React.HTMLAttributes<HTMLAnchorElement> {
  href?: string;

  disabled?: boolean;
}

const defaultProps: Partial<SafeAnchorProps> = {
  component: "a",
};

const SafeAnchor: RefForwardingComponent<
  "a",
  SafeAnchorProps
> = React.forwardRef((props: SafeAnchorProps, ref: React.Ref<HTMLElement>) => {
  const { component: Component, href, disabled, onClick, ...rest } = props;

  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (disabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      onClick?.(event);
    },
    [disabled, onClick]
  );

  if (disabled) {
    rest.tabIndex = -1;
    rest["aria-disabled"] = true;
  }

  if (!href || href !== "#") {
    rest.role = rest.role || "button";
  }

  return <Component {...rest} href={href} ref={ref} onClick={handleClick} />;
});

SafeAnchor.defaultProps = defaultProps;
SafeAnchor.displayName = "SafeAnchor";

export default SafeAnchor;
