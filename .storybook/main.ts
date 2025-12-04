import type { StorybookConfig } from '@storybook/react/types';

const config: StorybookConfig = {
  stories: ['../components/**/*.stories.@(tsx|mdx)', '../stories/**/*.stories.@(tsx|mdx)'],
  addons: ['@storybook/addon-essentials'],
  framework: '@storybook/react',
  docs: {
    autodocs: true,
  },
};

export default config;
