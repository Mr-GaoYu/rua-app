import { configureStore } from "@reduxjs/toolkit";
import { combineReducers, applyMiddleware } from "redux";

export interface ResourcesState {}

export interface ApplicationState {
  __resources: ResourcesState;
}

const __resourcesDefaultState = {};

const preloadedState: ApplicationState = {
  __resources: __resourcesDefaultState,
};

const __resources = combineReducers({});

const reducer = combineReducers<ApplicationState>({
  __resources,
});

export default configureStore({
  reducer,
  preloadedState,
});
