import React from "react";

export type Key = React.Key;

export type HoverEventHandler = (info: { key: Key; hover: boolean }) => void;
