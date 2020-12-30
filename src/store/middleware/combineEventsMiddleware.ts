import { Middleware } from "redux";
import { EventHandler } from "src/store/types";

const eventsMiddlewareFactory = (
  ...eventHandler: EventHandler[]
): Middleware => ({ dispatch, getState }) => (next) => (action: any) => {
  next(action);
};

export default eventsMiddlewareFactory;
