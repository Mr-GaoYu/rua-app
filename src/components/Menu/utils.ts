import isPathOneOf from "src/utilities/routing/isPathOneOf";

export const linkIsActive = (
  href: string,
  locationSearch: string,
  locationPathname: string,
  activeLinks: Array<string> = []
) => {
  const currentlyOnOneClickTab = locationSearch.match(/one-click/gi);
  const isOneClickTab = href.match(/one-click/gi);

  if (currentlyOnOneClickTab) {
    return isOneClickTab;
  }

  return isPathOneOf([href, ...activeLinks], locationPathname);
};

