import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import DeleteIcon from '@material-ui/icons/Delete';
import AbuseTicketBanner from './AbuseTicketBanner';

export default {
  title: 'Rua/AbuseTicketBanner',
  component: AbuseTicketBanner,

} as Meta;

const Template: Story = (args) => <AbuseTicketBanner {...args} />;

export const Primary = Template.bind({});
Primary.args = {
 
};

