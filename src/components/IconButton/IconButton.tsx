import React from 'react';
import IconButton, { IconButtonProps } from 'src/components/core/IconButton';
import {
    createStyles,
    Theme,
    withStyles,
    WithStyles,
    CSSProperties
} from 'src/components/core/styles';
import classNames from 'classnames';

const styles = (theme: Theme) =>
    createStyles({
        root: {}
    })

type ClassNames = 'root';

interface Props extends IconButtonProps {
    style?: CSSProperties;
    onClick?: (e: React.SyntheticEvent<HTMLElement>) => void;
    className?: any;
    disabled?: boolean;
    destructive?: boolean;
}

export type CombinedProps = Props & WithStyles<ClassNames>;

const IconButtonWrapper: React.FC<CombinedProps> = props => {
    const { children, className, style, ...rest } = props;

    return (
        <IconButton
            className={classNames(
                className
            )}
            style={style}
            {...rest}>
            {children}
        </IconButton>

    )
}

const styled = withStyles(styles);

export default styled(IconButtonWrapper);