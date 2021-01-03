import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import ViewAllLink from './ViewAllLink';

export default {
    title: 'Rua/ViewAllLink',
    component: ViewAllLink,

} as Meta;


export const Default = () => (
    <ViewAllLink text="测试" link="http://www.baidu.com" count={55}/>
)