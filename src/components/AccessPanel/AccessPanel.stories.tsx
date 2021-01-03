import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import AccessPanel from './AccessPanel';

export default {
    title: 'Rua/AccessPanel',
    component: AccessPanel,

} as Meta;

const Template: Story = (args) => <AccessPanel {...args} />;

export const Primary = Template.bind({});
Primary.args = {

};

