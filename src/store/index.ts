import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import preferences, {
  defaultState as preferencesState,
  State as PreferencesState,
} from "./preferences/preferences.reducer";
import thunk from "redux-thunk";

export interface ResourcesState {}

export interface ApplicationState {
  __resources: ResourcesState;
  preferences: PreferencesState;
}

const __resourcesDefaultState = {};

const defaultState: ApplicationState = {
  __resources: __resourcesDefaultState,
  preferences: preferencesState,
};

const __resources = combineReducers({});

const reducers = combineReducers<ApplicationState>({
  __resources,
  preferences,
});

const reduxDevTools = (window as any).__REDUX_DEVTOOLS_EXTENSION__;

const enhancers = compose(
  applyMiddleware(thunk),
  reduxDevTools ? reduxDevTools() : (f: any) => f
) as any;

export default createStore(reducers, defaultState, enhancers);
