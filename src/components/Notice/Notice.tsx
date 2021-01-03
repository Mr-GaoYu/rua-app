import React from 'react';
import Typography, { TypographyProps } from 'src/components/core/Typography';
import Grid, { GridProps } from 'src/components/Grid';
import {
    makeStyles,
    Theme,
    withTheme,
    WithTheme
} from 'src/components/core/styles';
import { sanitizeHTML } from 'src/utilities/sanitize-html';
import classNames from 'classnames';
import Check from 'src/assets/check.svg';
import Warning from 'src/assets/warning.svg';
import Error from 'src/assets/alert.svg';
import Close from '@material-ui/icons/Close';

const useStyles = makeStyles((theme: Theme) => ({
    '@keyframes fadeIn': {
        from: {
            opacity: 0
        },
        to: {
            opacity: 1
        }
    },
    root: {
        marginBottom: theme.spacing(2),
        position: 'relative',
        padding: '4px 16px',
        maxWidth: '100%',
        display: 'flex',
        alignItems: 'center',
        '& + .notice': {
            marginTop: `${theme.spacing(1)}px !important`
        }
    },
   
    important: {
        backgroundColor: theme.cmrBGColors.bgPaper,
        padding: theme.spacing(2),
       
    },
    icon: {
        color: 'white',
        position: 'absolute',
        left: -25 // This value must be static regardless of theme selection
    },
    closeIcon: {
        paddingLeft: theme.spacing(1)
    },
    inner: {
        width: '100%'
    },
    breakWords: {
        '& $noticeText': {
            wordBreak: 'break-all'
        }
    },
    noticeText: {
        color: theme.palette.text.primary,
        fontSize: '1rem',
        lineHeight: `20px`,
        fontFamily: 'LatoWebBold', // we keep this bold at all times
        '& p': {
            fontSize: '1rem'
        }
    },
    error: {
        borderLeft: `5px solid ${theme.palette.status.errorDark}`,
        animation: '$fadeIn 225ms linear forwards',
        '&$important': {
            borderLeftWidth: 32
        }
    },
    errorList: {
        borderLeft: `5px solid ${theme.palette.status.errorDark}`
    },
    warning: {
        borderLeft: `5px solid ${theme.palette.status.warningDark}`,
        animation: '$fadeIn 225ms linear forwards',
        '&$important': {
            borderLeftWidth: 32
        },
        '& $icon': {
            color: '#555'
        }
    },
    warningList: {
        borderLeft: `5px solid ${theme.palette.status.warningDark}`
    },
    success: {
        borderLeft: `5px solid ${theme.palette.status.successDark}`,
        animation: '$fadeIn 225ms linear forwards',
        '&$important': {
            borderLeftWidth: 32
        }
    },
    successList: {
        borderLeft: `5px solid ${theme.palette.status.successDark}`
    },
    flag: {
        marginRight: theme.spacing(2)
    }
}));

interface Props extends GridProps {
    text?: string | JSX.Element;
    html?: string;
    important?: boolean;
    warning?: boolean;
    success?: boolean;
    dismissible?: boolean;
    error?: boolean;
    onClose?: () => void;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    notificationList?: boolean;
    className?: string;
    errorGroup?: string;
    breakWords?: boolean;
    spacingTop?: 0 | 8 | 16 | 24;
    spacingBottom?: 0 | 8 | 16 | 24;
    typeProps?: TypographyProps;
}

type CombinedProps = Props & WithTheme;

const Notice: React.FC<CombinedProps> = props => {
    const {
        text,
        html,
        important,
        success,
        warning,
        error,
        notificationList,
        className,
        dismissible,
        onClose,
        onClick,
        errorGroup,
        breakWords,
        spacingTop,
        spacingBottom,
        typeProps,
        children
    } = props;
    const classes = useStyles();

    const c = html ? (
        <Typography
            {...typeProps}
            dangerouslySetInnerHTML={{ __html: sanitizeHTML(html) }}
        />
    ) : (
            <Typography
                {...typeProps}
                onClick={onClick}
                className={`${classes.noticeText} noticeText`}
            >
                {Boolean(text) && text}
                {Boolean(children) && children}
            </Typography>
        )

    const errorScrollClassName = errorGroup
        ? `error-for-scroll-${errorGroup}`
        : `error-for-scroll`;

    const dataAttributes = !error
        ? {
            'data-qa-notice': true
        }
        : {
            'data-qa-notice': true,
            'data-qa-error': true
        };

    return (
        <Grid
            item
            className={classNames({
                [classes.root]: true,
                [errorScrollClassName]: error,
                [classes.breakWords]: breakWords,
                [classes.important]: important,
                [classes.error]: error && !notificationList,
                [classes.errorList]: error && notificationList,
                [classes.success]: success && !notificationList,
                [classes.successList]: success && notificationList,
                [classes.warning]: warning && !notificationList,
                [classes.warningList]: warning && notificationList,
                notice: true,
                ...(className && { [className]: true })
            })
            }
            style={{
                marginTop: spacingTop !== undefined ? spacingTop : 0,
                marginBottom: spacingBottom !== undefined ? spacingBottom : 24
            }}
            {...dataAttributes}
            role="alert">
            {important &&
                ((success && <Check className={classes.icon} />) ||
                    (warning && <Warning className={classes.icon} />) ||
                    (error && <Error className={classes.icon} />))}

            <div className={classes.inner}>{c}</div>

            {dismissible && (
                <Grid item className={classes.closeIcon}>
                    <Close
                        style={{
                            cursor: 'pointer'
                        }}
                        onClick={onClose}
                    />
                </Grid>
            )}
        </Grid>
    )
}

export default withTheme(Notice)