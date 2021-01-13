import { applyMiddleware, combineReducers, compose, createStore } from "redux";

import thunk from "redux-thunk";

export interface ResourcesState {
}

export interface ApplicationState {
  __resources: ResourcesState;
}

const __resourcesDefaultState = {
};

const defaultState: ApplicationState = {
  __resources: __resourcesDefaultState,
};

const __resources = combineReducers({
});

const reducers = combineReducers<ApplicationState>({
  __resources,
});

const reduxDevTools = (window as any).__REDUX_DEVTOOLS_EXTENSION__;

const enhancers = compose(
  applyMiddleware(thunk),
  reduxDevTools ? reduxDevTools() : (f: any) => f
) as any;

export default createStore(reducers, defaultState, enhancers);
