import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Button from './Button';
import ButtonLink from './ButtonLink';
import { default as MDivider } from 'src/components/core/Divider';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';

const Divider = () => (
    <MDivider style={{ marginBottom: '8px', marginTop: '8px' }} />
);

export default {
    title: 'Rua/Button',
    component: Button,

} as Meta;


export const Types = () => (
    <React.Fragment>
        <Button buttonType="primary" data-qa-button="primary">
            Primary
      </Button>
        <Divider />
        <Button buttonType="secondary" data-qa-button="secondary">
            Secondary
      </Button>
        <Divider />
        <Button buttonType="cancel" data-qa-button="cancel">
            Cancel
      </Button>
        <Divider />
        <Button buttonType="remove" data-qa-button="remove" />
        <Divider />
        <ButtonLink to="javascript:void(0)" linkText="Link as Primary" />
        <Divider />
        <ButtonLink
            secondary
            to="javascript:void(0)"
            linkText="Link as Secondary"
        />
    </React.Fragment>
)

export const Disabled = () => (
    <React.Fragment>
        <Button disabled buttonType="primary" data-qa-button="primary">
            Primary
      </Button>
        <Divider />
        <Button disabled buttonType="secondary" data-qa-button="secondary">
            Secondary
      </Button>
        <Divider />
        <Button
            disabled
            destructive
            buttonType="primary"
            data-qa-button="destructive"
        >
            Destructive
      </Button>
        <Divider />
        <Button disabled buttonType="cancel" data-qa-button="cancel">
            Cancel
      </Button>
        <Divider />
    </React.Fragment>
)
export const Loading = () => (
    <React.Fragment>
        <Button loading buttonType="primary" data-qa-button="primary">
            Primary
      </Button>
        <Divider />
        <Button loading buttonType="secondary" data-qa-button="secondary">
            Secondary
      </Button>
        <Divider />
        <Button loading buttonType="cancel" data-qa-button="cancel">
            Cancel
      </Button>
        <Divider />
    </React.Fragment>
)
export const LoadingWithText = () => {
    return (
        <React.Fragment>
            <Button
                loading
                buttonType="primary"
                data-qa-button="primary"
                loadingText="Fetching Linodes..."
            >
                Primary
        </Button>
            <Divider />
            <Button
                loading
                buttonType="secondary"
                data-qa-button="secondary"
                loadingText="Fetching Volumes..."
            >
                Secondary
        </Button>
            <Divider />
            <Button
                loading
                buttonType="cancel"
                data-qa-button="cancel"
                loadingText="Fetching Domains..."
            >
                Cancel
        </Button>
            <Divider />
            <Button
                loading
                buttonType="primary"
                compact
                data-qa-button="primary"
                loadingText="Fetching Linodes..."
            >
                Primary Compact
        </Button>
            <Divider />
            <Button
                loading
                compact
                buttonType="secondary"
                data-qa-button="secondary"
                loadingText="Fetching Volumes..."
            >
                Secondary Compact
        </Button>
            <Divider />
            <Button
                loading
                compact
                buttonType="cancel"
                data-qa-button="cancel"
                loadingText="Fetching Domains..."
            >
                Cancel Compact
        </Button>
            <Divider />
        </React.Fragment>
    );
}

export const Destructive = () => (
    <React.Fragment>
        <Button
            destructive
            buttonType="primary"
            data-qa-button="primary"
            data-qa-btn-type="destructive"
        >
            Primary
      </Button>
        <Divider />
        <Button
            disabled
            destructive
            buttonType="secondary"
            data-qa-button="secondary"
        >
            Secondary
      </Button>
        <Divider />
    </React.Fragment>
)

export const LoadingDestructive = () => (
    <React.Fragment>
        <Button
            loading
            destructive
            buttonType="primary"
            data-qa-button="primary"
            data-qa-btn-type="destructive"
        >
            Primary
      </Button>
        <Divider />
        <Button
            loading
            destructive
            buttonType="secondary"
            data-qa-button="secondary"
            data-qa-btn-type="destructive"
        >
            Secondary
      </Button>
        <Divider />
    </React.Fragment>
)

export const PrimaryDropdown = () => (
    <React.Fragment>
        <Button
            buttonType="primary"
            className="button-dropdown"
            data-qa-button="dropdown"
        >
            Primary Dropdown
        <KeyboardArrowDown className="caret" />
        </Button>
        <Divider />
        <Button
            buttonType="primary"
            className="button-dropdown"
            data-qa-button="dropdown"
        >
            Primary Dropdown Active
        <KeyboardArrowUp className="caret" />
        </Button>
        <Divider />
        <Button
            buttonType="primary"
            disabled
            className="button-dropdown"
            data-qa-button="dropdown"
        >
            Primary Dropdown
        <KeyboardArrowDown className="caret" />
        </Button>
    </React.Fragment>
)

export const SecondaryDropdown = () => (
    <React.Fragment>
        <Button
            buttonType="secondary"
            className="button-dropdown"
            data-qa-button="dropdown-secondary"
        >
            Secondary Dropdown
        <KeyboardArrowDown className="caret" />
        </Button>
        <Divider />
        <Button
            buttonType="secondary"
            className="button-dropdown"
            data-qa-button="dropdown-secondary"
        >
            Secondary Dropdown Active
        <KeyboardArrowUp className="caret" />
        </Button>
        <Divider />
        <Button
            buttonType="secondary"
            disabled
            className="button-dropdown"
            data-qa-button="dropdown-secondary"
        >
            Secondary Dropdown
        <KeyboardArrowDown className="caret" />
        </Button>
    </React.Fragment>
)