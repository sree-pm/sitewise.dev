import React from 'react';
import { Preview } from '@storybook/react';
import '@/lib/globals.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: { expanded: true },
  },
};

export const decorators = [
  (Story) => (
    <div style={{ padding: '24px', background: '#000', minHeight: '100vh' }}>
      <Story />
    </div>
  ),
];

export default preview;
