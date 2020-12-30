import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "src/store";
import { UserPreferences } from "src/store/preferences/preferences.actions";
import {
  getUserPreferences,
  updateUserPreferences,
} from "src/store/preferences/preferences.requests";
import { Dispatch } from "./types";

export interface Preferences {
  preferences: UserPreferences;
  getPreferences: () => Promise<UserPreferences>;
  updatePreferences: (preferences: UserPreferences) => Promise<UserPreferences>;
}

export const usePreferences = () => {
  const dispatch: Dispatch = useDispatch();
  const preferences = useSelector((state: ApplicationState) => {
    return state.preferences.data;
  });

  const getPreferences = () => dispatch(getUserPreferences());

  const updatePreferences = (newPreferences: UserPreferences) =>
    dispatch(getUserPreferences()).then((currentPreferences) => {
      dispatch(
        updateUserPreferences({ ...currentPreferences, ...newPreferences })
      );
    });

  return {
    preferences,
    getPreferences,
    updatePreferences,
  };
};

export default usePreferences;
