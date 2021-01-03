import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import HelpIcon from './HelpIcon';
import Grid from 'src/components/Grid';

export default {
    title: 'Rua/HelpIcon',
    component: HelpIcon,

} as Meta;


export const Default = () => (
    <HelpIcon text="There is some help text! Yada, yada, yada..." />
)

export const Center = () => (
    <Grid container justify="center">
        <Grid item>
            <HelpIcon text="There is some help text! Yada, yada, yada..." />
        </Grid>
    </Grid>
)
export const Left = () => (
    <Grid container justify="flex-start">
        <Grid item>
            <HelpIcon text="There is some help text! Yada, yada, yada..." />
        </Grid>
    </Grid>
)
export const Right = () => (
    <Grid container justify="flex-end">
        <Grid item>
            <HelpIcon text="There is some help text! Yada, yada, yada..." />
        </Grid>
    </Grid>
)

