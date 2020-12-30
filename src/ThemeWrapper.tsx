import React from "react";
import { dark, light } from "src/theme";
import PreferenceToggle, { ToggleProps } from 'src/components/PreferenceToggle';
import withPreferences, {
  PreferencesActionsProps
} from 'src/containers/preferences.container';
import { ThemeProvider } from 'src/components/core/styles';

export type ThemeChoice = "dark" | "light";
export type SpacingChoice = "compact" | "normal";

type RenderChildren = (
  toggle: () => void,
  spacing: () => void
) => React.ReactNode;

interface Props {
  children: RenderChildren | React.ReactNode;
  theme?: ThemeChoice;
  spacing?: SpacingChoice;
}

type CombinedProps = Props & PreferencesActionsProps;

const ThemeWrapper: React.FC<CombinedProps> = (props) => {
  const {
    children,
    theme,
    spacing,
    getUserPreferences,
    updateUserPreferences
  } = props;

  const toggleTheme = (value: ThemeChoice) => {

  }

  React.useEffect(() => {
    getUserPreferences()
      .catch(
        () =>
        /** swallow the error. PreferenceToggle.tsx handles failures gracefully */ null
      );
  }, [])

  return (
    <PreferenceToggle<'light' | 'dark'>
      preferenceKey="theme"
      preferenceOptions={['light', 'dark']}
      localStorageKey="themeChoice"
      toggleCallbackFnDebounced={toggleTheme}
      value={theme}>
      {({
        preference: themeChoice,
        togglePreference: _toggleTheme
      }: ToggleProps<ThemeChoice>) => (
        <PreferenceToggle<"compact" | "normal">
          preferenceKey="spacing"
          preferenceOptions={['normal', 'compact']}
          localStorageKey="spacingChoice"
          value={spacing}>

        </PreferenceToggle>
      )
      }
    </PreferenceToggle>
  );
};

interface MemoizedThemeProviderProps {
  themeChoice: ThemeChoice;
  spacingChoice: SpacingChoice;
  toggleTheme: () => ThemeChoice;
  toggleSpacing: () => SpacingChoice;
  children: any;
}

const MemoizedThemeProvider: React.FC<MemoizedThemeProviderProps> = props => {
  const {
    themeChoice,
    spacingChoice,
    toggleTheme,
    toggleSpacing,
    children
  } = props;

  return (
    <ThemeProvider>
      {typeof children === 'function'
        ? (children as RenderChildren)(toggleTheme, toggleSpacing)
        : children}
    </ThemeProvider>
  )
}

export default withPreferences<CombinedProps, Props>()(ThemeWrapper)
