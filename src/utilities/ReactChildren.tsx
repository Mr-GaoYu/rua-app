import React from "react";

export function map(children: React.ReactNode, func: any, context?: any) {
    let index = 0;
    return React.Children.map(children, child => {
      if (!React.isValidElement(child)) {
        return child;
      }
      const handle = func.call(context, child, index);
      index += 1;
      return handle;
    });
  }
  
  export function cloneElement(children: React.ReactNode, func: any, context?: any) {
    return map(
      children,
      (child: React.DetailedReactHTMLElement<any, HTMLElement>, index: number) =>
        React.cloneElement(child, {
          key: index,
          ...func(child, index)
        }),
      context
    );
  }
