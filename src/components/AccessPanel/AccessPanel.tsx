import React from 'react';
import {
    createStyles,
    Theme,
    withStyles,
    WithStyles
} from 'src/components/core/styles';
import RenderGuard from 'src/components/RenderGuard';
import Paper from 'src/components/core/Paper';
import classNames from 'classnames';

type ClassNames = 'root'

const styles = (theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            width: '100%',
            marginTop: theme.spacing(3),
            backgroundColor: theme.cmrBGColors.bgPaper
        },
    })

interface Props {
    className?: string;
}

export type CombinedProps = Props & WithStyles<ClassNames>;

const AccessPanel: React.FC<CombinedProps> = props => {
    const { classes, className } = props;

    return (
        <Paper
            className={classNames(
                {
                    [classes.root]: true,

                },
                className
            )}>2</Paper>
    )
}

const styled = withStyles(styles)

export default RenderGuard(styled(AccessPanel))