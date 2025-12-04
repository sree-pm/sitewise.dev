import React from 'react';
import { Input, Textarea, Select } from '@/atomic-design-system/atoms/inputs';

export default {
  title: 'Atoms/Input',
  component: Input,
};

export const Default = () => <Input placeholder="Your email" />;
export const WithLabel = () => <Input label="Email" placeholder="you@example.com" />;
export const TextareaStory = () => <Textarea label="Message" placeholder="Write something..." rows={4} />;
export const SelectStory = () => <Select label="Plan" options={[{label:'Free',value:'free'},{label:'Pro',value:'pro'}]} />;
