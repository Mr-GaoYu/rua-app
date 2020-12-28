import createMuiTheme, {
  ThemeOptions,
} from "src/components/core/styles/createMuiTheme";
import { mergeDeepRight } from "ramda";

export const COMPACT_SPACING_UNIT = 4;
export const NORMAL_SPACING_UNIT = 8;

export interface ThemeOverrides {
  spacingOverride: typeof COMPACT_SPACING_UNIT | typeof NORMAL_SPACING_UNIT;
}

type ThemeDefaults = (options: ThemeOverrides) => ThemeOptions;

const themeDefaults: ThemeDefaults = ({ spacingOverride: spacingUnit }) => {
  return {};
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (options: ThemeOverrides & ThemeOptions) =>
  createMuiTheme(
    mergeDeepRight(
      themeDefaults({
        spacingOverride: options.spacingOverride,
      }),
      {
        breakpoints: {
          values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
          },
        },
        ...options,
      }
    )
  );
