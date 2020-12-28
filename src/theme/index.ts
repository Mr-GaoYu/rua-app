import createTheme from "./themeFactory";

export const light = (spacingOverride?: number) => {
  const options: any = { name: "lightTheme" };

  if (spacingOverride) {
    options.spacingOverride = spacingOverride;
  }

  return createTheme(options);
};

export const dark = (spacingOverride?: number) => {
  const options: any = { ...darkThemeOptions };
  if (spacingOverride) {
    options.spacingOverride = spacingOverride;
  }
  return createTheme(options);
};

const darkThemeOptions = {
  name: "darkTheme",
};
