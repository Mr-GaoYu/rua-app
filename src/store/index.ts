import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

export interface ResourcesState {}

export interface ApplicationState {
  __resources: ResourcesState;
}

const __resourcesDefaultState = {};

const defaultState: ApplicationState = {
  __resources: __resourcesDefaultState,
};

const __resources = combineReducers({});

const reducers = combineReducers<ApplicationState>({
  __resources,
});

export default configureStore({
  reducer: reducers,
  preloadedState: defaultState,
});
