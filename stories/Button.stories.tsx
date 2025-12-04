import React from 'react';
import { Button } from '@/atomic-design-system/atoms/button';

export default {
  title: 'Atoms/Button',
  component: Button,
};

export const Primary = () => <Button size="lg">Primary Action</Button>;
export const Glow = () => <Button variant="glow">Glow</Button>;
export const Outline = () => <Button variant="outline">Outline</Button>;
