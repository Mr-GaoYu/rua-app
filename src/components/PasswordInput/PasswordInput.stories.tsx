import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import PasswordInput from './PasswordInput';

export default {
    title: 'Rua/PasswordInput',
    component: PasswordInput,

} as Meta;

const Template: Story = (args) => <PasswordInput {...args} />;

export const Primary = Template.bind({});
Primary.args = {

};

