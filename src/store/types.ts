import { APIError } from "src/api-v4/types";
import { ThunkAction, ThunkDispatch as _ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "src/store";
import { Action, Dispatch } from "redux";

export interface EntityError {
  read?: APIError[];
  create?: APIError[];
  delete?: APIError[];
  update?: APIError[];
}

export interface RequestableData<D, E = APIError[]> {
  lastUpdated: number;
  loading: boolean;
  data?: D;
  error?: E;
}

export type ThunkResult<T> = ThunkAction<
  T,
  ApplicationState,
  undefined,
  Action
>;

export type ThunkActionCreator<ReturnType, Params = void> = (
  args: Params,
  ...args2: any[]
) => ThunkResult<ReturnType>;


export type ThunkDispatch = _ThunkDispatch<ApplicationState, undefined, Action>;
