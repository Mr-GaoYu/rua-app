const PRODUCTION = 'production';

/** native to webpack build */
export const isProductionBuild = process.env.NODE_ENV === PRODUCTION;