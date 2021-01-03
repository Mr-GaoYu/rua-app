import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import _Toggle from './Toggle';
import FormControlLabel from 'src/components/core/FormControlLabel';

export default {
    title: 'Rua/Toggle',
    component: _Toggle,

} as Meta;

class Example extends React.Component<{}, { value?: string }> {
    state = { value: undefined };

    handleChange = (e: React.ChangeEvent<HTMLFormElement>, value: string) => {
        this.setState(() => ({ value }));
    };

    render() {
        return (
            <FormControlLabel
                className="toggleLabel"
                control={<_Toggle />}
                label="Example Label"
            />
        );
    }
}


export const Toggle = () => <Example />

