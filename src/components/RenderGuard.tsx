import React from 'react';
import { equals } from 'ramda';
import { WithTheme, withTheme } from 'src/components/core/styles';
import { getDisplayName } from 'src/utilities/getDisplayName';

interface RenderGuardProps {
    updateFor?: any[];
}


const RenderGuard = <P extends {}>(
    Component: React.ComponentType<RenderGuardProps & P>
) => {
    class ComponentWithRenderGuard extends React.Component<RenderGuardProps & WithTheme> {

        static displayName = `WithRenderGuard(${getDisplayName(Component)})`;

        shouldComponentUpdate(nextProps: P & RenderGuardProps & WithTheme) {
            if (Array.isArray(this.props.updateFor)) {
                return (
                    !equals(this.props.updateFor, nextProps.updateFor) ||
                    this.props.theme.name !== nextProps.theme.name ||
                    this.props.theme.spacing(1) !== nextProps.theme.spacing(1)
                );
            }
            return true;
        }

        render() {
            const { updateFor, theme, ...rest } = this.props as any;
            return <Component {...rest} />;
        }
    }

    return withTheme(ComponentWithRenderGuard) as React.ComponentType<
        P & RenderGuardProps
    >;
}

export default RenderGuard;