import React from 'react';
import { Header } from '@/atomic-design-system/organisms';
import { Button } from '@/atomic-design-system/atoms/button';

export default {
  title: 'Organisms/Header',
  component: Header,
};

export const Default = () => (
  <Header
    title="sitewise.dev"
    navLinks={[{label:'Product',href:'#'},{label:'Docs',href:'#'}]}
    rightContent={<Button size="sm">Sign In</Button>}
    sticky={false}
  />
);
