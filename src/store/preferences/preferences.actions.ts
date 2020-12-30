import { actionCreatorFactory } from "typescript-fsa";
import { SpacingChoice, ThemeChoice } from "src/ThemeWrapper";
import { APIError } from "src/api-v4/types";

const actionCreator = actionCreatorFactory(`@@manager/preferences`);

export interface UserPreferences {
  theme?: ThemeChoice;
  spacing?: SpacingChoice;
}

export const handleGetPreferences = actionCreator.async<
  void,
  UserPreferences,
  APIError[]
>(`get`);

export const handleUpdatePreferences = actionCreator.async<
  UserPreferences,
  UserPreferences,
  APIError[]
>(`update`);
