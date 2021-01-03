import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import TextField from './TextField';

export default {
    title: 'Rua/TextField',
    component: TextField,

} as Meta;

export const Normal = () => (
    <TextField label="Input Label" placeholder="Normal State">
        Normal State
    </TextField>
);
export const Small = () => (
    <TextField label="Input Label" placeholder="Small Input" small>
        Normal State | Small input
    </TextField>
)
export const Error = () => (
    <TextField
        label="Input Label"
        placeholder="Error State"
        errorText="This input needs further attention"
    >
        Error State
    </TextField>
)
export const Active = () => (
    <TextField label="Input Label" placeholder="Active State" autoFocus>
        Active State
    </TextField>
)
export const Affirmative = () => (
    <TextField label="Input Label" placeholder="Affirmative State" affirmative>
        Affirmative State
    </TextField>
)
export const Disabled = () => (
    <TextField label="Input Label" placeholder="Disabled State" disabled>
        Disabled State
    </TextField>
)


