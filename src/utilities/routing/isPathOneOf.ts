import { matchPath, RouteProps } from "react-router-dom";

/**
 *
 * @param paths Haystack.
 * @param pathname Needle.
 * @param matchPath arguments.
 */
// eslint-disable-next-line import/no-anonymous-default-export
export default (
  paths: string[],
  pathname: string,
  props?: RouteProps
): boolean => {
  return paths.reduce((result, path) => {
    return result || Boolean(matchPath(pathname, { ...props, path }));
  }, false);
};
