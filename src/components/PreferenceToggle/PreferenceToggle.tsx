import React from "react";
import withPreferences, {
  PreferencesActionsProps,
} from "src/containers/preferences.container";
import { getStorage } from "src/utilities/storage";

type PreferenceValue = boolean | string | number;

interface RenderChildrenProps {
  preference: PreferenceValue;
  togglePreference: () => PreferenceValue;
}

type RenderChildren = (props: RenderChildrenProps) => JSX.Element;

interface Props<T = PreferenceValue> {
  preferenceKey: string;
  value?: T;
  preferenceOptions: [T, T];
  toggleCallbackFn?: (value: T) => void;
  toggleCallbackFnDebounced?: (value: T) => void;
  initialSetCallbackFn?: (value: T) => void;
  localStorageKey?: string;
  children: RenderChildren;
}

interface PreferenceProps {
  preferences?: Record<string, any>;
  preferenceError?: any;
  preferencesLastUpdated: number;
}

type CombinedProps<T = PreferenceValue> = Props<T> &
  PreferenceProps &
  PreferencesActionsProps;

const PreferenceToggle: React.FC<CombinedProps> = (props) => {
  const {
    value,
    preferenceKey,
    preferenceOptions,
    toggleCallbackFn,
    toggleCallbackFnDebounced,
    initialSetCallbackFn,
    localStorageKey,
    children,
  } = props;

  const [currentlySetPreference, setPreference] = React.useState<
    PreferenceValue | undefined
  >(value);
  const [lastUpdated, setLastUpdated] = React.useState<number>(0);

  React.useEffect(() => {}, []);

  React.useEffect(() => {
    if (!isNullOrUndefined(currentlySetPreference)) {
    }

    return () => null;
  }, [currentlySetPreference]);

  const togglePreference = () => {
    const newPreferenceToSet =
      currentlySetPreference === preferenceOptions[0]
        ? preferenceOptions[1]
        : preferenceOptions[0];

    setPreference(newPreferenceToSet);

    if (toggleCallbackFn) {
      toggleCallbackFn(newPreferenceToSet);
    }

    return newPreferenceToSet;
  };

  if (isNullOrUndefined(currentlySetPreference)) {
    return null;
  }

  return typeof children === "function"
    ? children({ preference: currentlySetPreference, togglePreference })
    : null;
};

const isNullOrUndefined = (value: any): value is null | undefined => {
  return typeof value === "undefined" || value === null;
};

export default withPreferences<PreferenceProps, Props>(
  (ownProps, { data: preferences, error, lastUpdated }) => ({
    preferences,
    preferenceError: error,
    preferencesLastUpdated: lastUpdated,
  })
)(PreferenceToggle);
