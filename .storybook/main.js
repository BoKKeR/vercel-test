const path = require('path')
const toPath = (_path) => path.join(process.cwd(), _path)

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  webpackFinal: async (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          '@emotion/core': toPath('node_modules/@emotion/react'),
          'emotion-theming': toPath('node_modules/@emotion/react'),
          '@': toPath('src'),
        },
      },
    }
  },
  babel: (config) => {
    config.presets[2][1] = { runtime: 'classic' }

    config.plugins = [
      ...config.plugins,
      ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
      // '@emotion/babel-plugin',
    ]

    return config
  },
}
