import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import PlusSquare from 'src/assets/plus-square.svg';
import IconTextLink from './IconTextLink';
import IconTextLink_CMR from './IconTextLink_CMR';

export default {
    title: 'Rua/IconTextLink',
    component: IconTextLink,

} as Meta;

class InteractiveIconTextLink extends React.Component {
    state = {
        active: false
    };

    handleClick = () => {
        alert('Thanks for clicking!');
        this.setState({ active: true });
    };

    render() {
        return (
            <React.Fragment>
                <IconTextLink
                    active={this.state.active}
                    SideIcon={PlusSquare}
                    onClick={this.handleClick}
                    text="Add an object"
                    title="Link title"
                />
                <br />
                <br />
                <IconTextLink
                    disabled
                    SideIcon={PlusSquare}
                    onClick={this.handleClick}
                    text="Add an object"
                    title="Link title"
                />
            </React.Fragment>
        );
    }
}

class InteractiveIconTextLinkCMR extends React.Component {
    state = {
        active: false
    };

    handleClick = () => {
        alert('Thanks for clicking!');
        this.setState({ active: true });
    };

    render() {
        return (
            <React.Fragment>
                <IconTextLink_CMR
                    active={this.state.active}
                    onClick={this.handleClick}
                    text="Add an object"
                    title="Link title"
                />
                <br />
                <br />
                <IconTextLink_CMR
                    disabled
                    onClick={this.handleClick}
                    text="Add an object"
                    title="Link title"
                />
            </React.Fragment>
        );
    }
}

export const CMR = () => (
    <InteractiveIconTextLinkCMR />
)
export const Interactive = () => (
    <InteractiveIconTextLink />
)

