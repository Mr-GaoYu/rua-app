import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import CircleProgress from './CircleProgress';

export default {
    title: 'Rua/CircleProgress',
    component: CircleProgress,

} as Meta;

const Template: Story = (args) => <CircleProgress {...args} />;

export const Indefinite = Template.bind({});
Indefinite.args = {
    noTopMargin: true,
};
export const Mini = Template.bind({});
Mini.args = {
    mini: true,
};
export const DataInside = () => (
    <CircleProgress noTopMargin green variant="static" value={50}>
        <span data-qa-progress-label>Some data</span>
    </CircleProgress>
)

