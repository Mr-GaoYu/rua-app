import React from 'react';
import CircularProgress, {
    CircularProgressProps
} from 'src/components/core/CircularProgress';
import {
    createStyles,
    Theme,
    withStyles,
    WithStyles
} from 'src/components/core/styles';
import classNames from 'classnames';

type ClassNames =
    | 'root'
    | 'mini'
    | 'tag'
    | 'sort'
    | 'noPadding'
    | 'noTopMargin'
    | 'progress'
    | 'valueInside'
    | 'topWrapper'
    | 'top';

const styles = (theme: Theme) => createStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        width: '100%',
        margin: '0 auto 20px',
        [theme.breakpoints.up('md')]: {
            flex: 1,
            height: 300
        }
    },
    progress: {
        position: 'relative',
        [theme.breakpoints.down('xs')]: {
            width: '72px !important',
            height: '72px !important'
        }
    },
    mini: {
        padding: theme.spacing(1) * 1.3
    },

    tag: {
        width: '12px !important',
        height: '12px !important',
        padding: 0,
        marginLeft: 4,
        marginRight: 4,
        '& circle': {
            stroke: 'white'
        }
    },
    valueInside: {
        position: 'absolute',
        marginTop: 4
    },
    top: {
        width: 70,
        height: 70,
        borderRadius: '50%',
        border: '1px solid #999',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            height: 120
        }
    },
    topWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        width: '100%',
        height: '100%'
    },
    sort: {
        width: '14px !important',
        height: '14px !important',
        padding: 0,
        position: 'relative',
        top: 4,
        marginLeft: 8,
        marginRight: 4
    },
    noPadding: {
        padding: 0
    },
    noTopMargin: {
        [theme.breakpoints.up('md')]: {
            top: 0,
            height: 'auto'
        }
    },
})

interface Props extends CircularProgressProps {
    mini?: boolean;
    noPadding?: boolean;
    noTopMargin?: boolean;
    tag?: boolean;
    sort?: boolean;
    children?: JSX.Element;
    green?: boolean;
    noInner?: boolean;
}

export type CombinedProps = Props & WithStyles<ClassNames>;

const CircleProgress: React.FC<CombinedProps> = props => {
    const { classes, noPadding, tag, sort, mini, noTopMargin, children, green, noInner, ...rest } = props;

    const value = typeof props.value === 'number' ? props.value : 0;
    const variant =
        typeof props.value === 'number' ? 'static' : 'indeterminate';

    return mini ? (
        <CircularProgress
            className={classNames({
                [classes.mini]: true,
                [classes.tag]: tag,
                [classes.sort]: sort,
                [classes.noPadding]: noPadding,
            })}
            size={noPadding ? 22 : 40}
            tabIndex={0} />
    ) : (
            <div
                className={classNames({
                    [classes.root]: true,
                    [classes.noTopMargin]: noTopMargin,
                })}>
                {children !== undefined && (
                    <div className={classes.valueInside}>{children}</div>
                )}
                {noInner !== true && (
                    <div className={classes.topWrapper}>
                        <div className={classes.top} />
                    </div>
                )}
                <CircularProgress
                    {...rest}
                    className={classes.progress}
                    size={green ? 128 : 124}
                    value={value}
                    variant={variant}
                    thickness={green ? 4 : 2}
                    data-qa-circle-progress={value}
                    data-testid="circle-progress"
                />
            </div>
        )
}

const styled = withStyles(styles)

export default styled(CircleProgress);