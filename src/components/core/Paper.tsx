import React from 'react';
import _Paper, { PaperProps as _PaperProps } from '@material-ui/core/Paper';
import FormHelperText from './FormHelperText'
import {
    createStyles,
    Theme,
    withStyles,
    WithStyles
} from 'src/components/core/styles';

type ClassNames = 'error' | 'errorText';

const styles = (theme: Theme) =>
    createStyles({
        error: {
            borderColor: `#ca0813 !important`
        },
        errorText: {
            color: '#ca0813'
        }
    });

export interface PaperProps extends _PaperProps {
    error?: string;
}

type CombinedProps = PaperProps & WithStyles<ClassNames>;

const Paper: React.FC<CombinedProps> = props => {
    const { classes, error, className, ...rest } = props;

    return (
        <React.Fragment>
            <_Paper
                className={error ? `${className} ${classes.error}` : className}
                {...rest}
            />
            {error && (
                <FormHelperText className={classes.errorText}>{error}</FormHelperText>
            )}
        </React.Fragment>
    )
}

const styled = withStyles(styles);

export default styled(Paper)