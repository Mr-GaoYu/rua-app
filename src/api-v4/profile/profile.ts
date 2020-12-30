import { API_ROOT } from "../constants";
import { UserPreferences } from './types';
import Request, { setURL,setMethod,setData } from "../request";

export const getUserPreferences = () => {
  return Request<Record<string, any>>(
    setURL(`${API_ROOT}/profile/preferences`)
  );
};

export const updateUserPreferences = (payload: UserPreferences) => {
    return Request<UserPreferences>(
      setURL(`${API_ROOT}/profile/preferences`),
      setData(payload),
      setMethod('PUT')
    );
  };