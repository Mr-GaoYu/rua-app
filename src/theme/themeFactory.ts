import createMuiTheme, {
  ThemeOptions,
} from "src/components/core/styles/createMuiTheme";
import { mergeDeepRight } from "ramda";

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    status: {
      success: string;
      successDark: string;
      warning: string;
      warningDark: string;
      error: string;
      errorDark: string;
    };
  }

  interface PaletteOptions {
    status?: {
      success?: string;
      successDark?: string;
      warning?: string;
      warningDark?: string;
      error?: string;
      errorDark?: string;
    };
  }
}

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    name: string;
    bg: any;
    cmrBGColors: any;
    cmrTextColors: any;
    color: any;
    font: any;
    animateCircleIcon: any;
  }

  interface ThemeOptions {
    name?: string;
    bg?: any;
    cmrBGColors?: any;
    cmrTextColors?: any;
    color?: any;
    font?: any;
    animateCircleIcon?: any;
  }
}

const cmrTextColors = {
  textAction: '#3683dc',
  textBillingSummary: '#32363c',
  textTab: '#3683dc',
  textTabActive: '#32363c',
  textStatusChip: '#5d646f',
  linkActiveMedium: '#2575d0',
  linkActiveLight: '#2575d0',
  headlineStatic: '#32363c',
  headlineActive: '#32363c',
  tableStatic: '#55595d',
  textTagButton: '#3683dc',
  textAccessTable: '#606469',
  textAccessCode: '#606469',
  textBreadcrumbParent: '#3683dc'
};

const primaryColors = {
  primary: '#727cf5',
  secondary: '#6c757d',
  success: '#0acf97',
  danger: '#fa5c7c',
  warning:'#ffbc00',
  info: '#39afd1',
  light: '#e3eaef',
  dark: '#313a46'
};



const cmrBGColors = {
  bgPaper: '#ffffff',
}

const primaryFonts = {
  normal: '"LatoWeb", sans-serif',
  semiBold: '"LatoWebSemibold", sans-serif',
  bold: '"LatoWebBold", sans-serif'
};

const iconCircleAnimation = {
  '& .circle': {
    fill: primaryColors.primary,
    transition: 'fill .2s ease-in-out .2s'
  },
  '& .outerCircle': {
    stroke: primaryColors.dark,
    strokeDasharray: 1000,
    strokeDashoffset: 1000,
    animation: '$dash 2s linear forwards'
  },
  '& .insidePath *': {
    transition: 'fill .2s ease-in-out .2s, stroke .2s ease-in-out .2s',
    stroke: 'white'
  }
};

export const COMPACT_SPACING_UNIT = 4;
export const NORMAL_SPACING_UNIT = 8;

export interface ThemeOverrides {
  spacingOverride: typeof COMPACT_SPACING_UNIT | typeof NORMAL_SPACING_UNIT;
}

type ThemeDefaults = (options: ThemeOverrides) => ThemeOptions;

const themeDefaults: ThemeDefaults = ({ spacingOverride: spacingUnit }) => {
  return {
    bg: {
      white: '#fff',
      palette: {
        primary: primaryColors,
        text: {
          primary: primaryColors.primary
        },

      }
    },
    animateCircleIcon: {
      ...iconCircleAnimation
    },
    color: {
      red: '#ca0813',
      menuText: '#a0abbf',
      menuActiveText: '#357df6'
    },
    font: {
      normal: primaryFonts.normal,
      semiBold: primaryFonts.semiBold,
      bold: spacingUnit === 4 ? primaryFonts.normal : primaryFonts.bold
    },
    palette: {
      status: {
        success: '#d7e3ef',
        successDark: '#3682dd',
        warning: '#fdf4da',
        warningDark: '#ffd002',
        error: '#f8dedf',
        errorDark: '#cd2227'
      }
    },
    cmrBGColors: cmrBGColors,
    cmrTextColors:cmrTextColors,
    overrides: {
      MuiSwitch: {
        root: {
          width: 68,
          height: 48,
          '& $checked': {
            '& input': {
              left: -20
            },
            '& .square': {
              fill: 'white'
            },
            '&$switchBase': {
              '& + $track': {
                opacity: 1
              }
            }
          },

          '& $disabled': {
            '&$switchBase': {
              '& + $track': {
                backgroundColor: '#ddd',
                borderColor: '#ccc'
              },
              '& .square': {
                fill: 'white'
              }
            }
          },
          '& .icon': {
            transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
            position: 'relative',
            left: 0,
            width: 16,
            height: 16,
            borderRadius: 0
          },
          '& .square': {
            transition: 'fill 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
          },
          '&:hover, &:focus': {
            '& $disabled': {
              '&$switchBase': {
                '& + $track': {
                  backgroundColor: '#ddd',
                  borderColor: '#ccc'
                }
              }
            },
            '& $track, & + $track': {
              borderColor: '#606469'
            },
            '& .square': {
              fill: '#aaa'
            },
            '& $checked': {
              '& .square': {
                fill: '#eee'
              },
              '& + $track': {
                opacity: 1
              }
            }
          }
        },
        disabled: {},
        checked: {},
        track: {
          top: 12,
          left: 12,
          marginLeft: 0,
          marginTop: 0,
          width: 42,
          height: 22,
          borderRadius: 0,
          backgroundColor: '#f4f4f4',
          border: '1px solid #999',
          boxSizing: 'content-box',
          transition: 'border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
        },
        switchBase: {
          color: primaryColors.primary,
          padding: 16,
          '&$checked': {
            transform: 'translateX(20px)'
          }
        }
      },
    }
  };
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
