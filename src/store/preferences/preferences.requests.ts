import {
    getUserPreferences as _getUserPreferences,
    updateUserPreferences as _updateUserPreferences
  } from 'src/api-v4/profile';
  import { createRequestThunk } from '../store.helpers';
  
  import {
    handleGetPreferences,
    handleUpdatePreferences
  } from './preferences.actions';
  
  export const getUserPreferences = createRequestThunk(
    handleGetPreferences,
    _getUserPreferences
  );
  
  export const updateUserPreferences = createRequestThunk(
    handleUpdatePreferences,
    _updateUserPreferences
  );
  