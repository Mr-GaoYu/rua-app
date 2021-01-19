import React from "react";
import { Key } from "./interface";

export const getKeyFromChildrenIndex = (
  child: React.ReactElement,
  eventKey: Key,
  index: number
): Key => {
  const prefix = eventKey || "";
  return child.key || `${prefix}item_${index}`;
};
