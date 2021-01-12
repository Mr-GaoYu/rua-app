import React from "react";

export const some = (children: React.ReactNode, method: Function, context?: any) => {
    let index = 0;
    let result = false;
  
    React.Children.forEach(children, child => {
      if (result) {
        return;
      }
      if (!React.isValidElement(child)) {
        return;
      }
  
      if (method.call(context, child, (index += 1))) {
        result = true;
      }
    });
  
    return result;
}