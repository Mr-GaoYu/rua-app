import ThemeDecorator from '../src/utilities/storybookDecorators';


export const parameters = {
  actions: {
    argTypesRegex: "^on[A-Z].*"
  },
}

export const decorators = [ThemeDecorator];

export const globalTypes = {
  theme: {
    name: '主题',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      items: ['light', 'dark'],
    },
  },
}