import React from "react";

export const loop = (children: React.ReactNode,cb:any) => {
  React.Children.forEach(children, (child: React.ReactElement) => {});
};
