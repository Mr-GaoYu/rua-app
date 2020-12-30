import { connect } from "react-redux";
import { State } from "src/store/preferences/preferences.reducer";
import { ApplicationState } from "src/store";
import { ThunkDispatch } from "src/store/types";
import {
  getUserPreferences,
  updateUserPreferences,
} from "src/store/preferences/preferences.requests";
import { UserPreferences } from "src/store/preferences/preferences.actions";

export interface PreferencesStateProps {
  preferences: UserPreferences;
}

export interface PreferencesActionsProps {
  getUserPreferences: () => Promise<UserPreferences>;
  updateUserPreferences: (params: UserPreferences) => Promise<UserPreferences>;
}

export type Props = PreferencesActionsProps & PreferencesStateProps;

// eslint-disable-next-line import/no-anonymous-default-export
export default <TInner extends {}, TOuter extends {}>(
  mapAccountToProps?: (ownProps: TOuter, profile: State) => TInner
) =>
  connect(
    (state: ApplicationState, ownProps: TOuter) => {
      if (mapAccountToProps) {
        return mapAccountToProps(ownProps, state.preferences);
      }
      return { preferences: state.preferences.data ?? {} };
    },
    (dispatch: ThunkDispatch) => ({
      getUserPreferences: () => dispatch(getUserPreferences()),
      updateUserPreferences: (payload: UserPreferences) =>
        dispatch(updateUserPreferences(payload)),
    })
  );
