const custom = require('./webpack.config.js');
const {
  mergeDeepRight
} = require('ramda');

module.exports = {
  stories: [
    "../src/components/**/*.stories.mdx",
    "../src/components/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  webpackFinal: (config) => {
    return mergeDeepRight(
      config,
      custom
    )
  },
}