import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from './IconButton';

export default {
  title: 'Rua/IconButton',
  component: IconButton,

} as Meta;

const Template: Story = (args) => <IconButton {...args} ></IconButton>;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Button',
  children: <DeleteIcon />
};

