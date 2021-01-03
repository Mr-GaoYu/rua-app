import React from 'react';
import classNames from 'classnames';
import { clamp } from 'ramda';
import { convertToKebabCase } from 'src/utilities/convertToKebabCase';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import CircleProgress from 'src/components/CircleProgress';
import InputAdornment from 'src/components/core/InputAdornment';
import FormHelperText from 'src/components/core/FormHelperText';
import InputLabel from 'src/components/core/InputLabel';
import HelpIcon from 'src/components/HelpIcon';
import TextField, { TextFieldProps } from 'src/components/core/TextField';
import {
    createStyles,
    Theme,
    withStyles,
    WithStyles,
    WithTheme
} from 'src/components/core/styles';

type ClassNames =
    | 'root'
    | 'helpWrapperContainer'
    | 'helpWrapper'
    | 'helpWrapperTextField'
    | 'expand'
    | 'errorText'
    | 'editable'
    | 'helperTextTop'
    | 'small'
    | 'noTransform'
    | 'selectSmall'
    | 'wrapper'
    | 'tiny'
    | 'absolute';

const styles = (theme: Theme) =>
    createStyles({
        wrapper: {
            marginTop: theme.spacing(2)
        },
        noTransform: {
            transform: 'none'
        },
        root: {
            marginTop: 0
        },
        helpWrapperContainer: {
            display: 'flex',
            width: '100%'
        },
        helpWrapper: {
            display: 'flex',
            alignItems: 'flex-end',
            flexWrap: 'wrap'
        },
        helpWrapperTextField: {
            width: 415,
            [theme.breakpoints.down('xs')]: {
                width: '100%'
            }
        },
        expand: {
            maxWidth: '100%'
        },
        small: {
            minHeight: 32,
            marginTop: 0,
            '& input': {
                minHeight: 32,
                padding: theme.spacing(1)
            }
        },
        selectSmall: {
            padding: '8px 32px 0 8px',
            minHeight: 32,
            minWidth: 132,
            '& svg': {
                marginTop: 0,
                width: 24,
                height: 24
            }
        },
        tiny: {
            width: '3.6em'
        },
        errorText: {
            color: theme.color.red
        },
        absolute: {
            position: 'absolute'
        },
        editable: {
            wordBreak: 'keep-all',
            paddingLeft: 1
        },
        helperTextTop: {
            marginBottom: theme.spacing(),
            marginTop: theme.spacing()
        },
        noMarginTop: {
            marginTop: 0
        }
    });

interface BaseProps {
    errorText?: string;
    errorGroup?: string;
    affirmative?: boolean;
    helperTextPosition?: 'top' | 'bottom';
    tooltipText?: string;
    className?: any;
    expand?: boolean;
    small?: boolean;
    editable?: boolean;
    tiny?: boolean;
    min?: number;
    max?: number;
    dataAttrs?: Record<string, any>;
    noMarginTop?: boolean;
    loading?: boolean;
    hideLabel?: boolean;
    hasAbsoluteError?: boolean;
    inputId?: string;
}

interface TextFieldPropsOverrides extends TextFieldProps {
    label: string;
}

type Props = BaseProps & TextFieldProps & TextFieldPropsOverrides;

export type CombinedProps = Props & WithStyles<ClassNames>;

const RuaTextField: React.FC<CombinedProps> = props => {
    const {
        tooltipText,
        errorText,
        helperText,
        errorGroup,
        required,
        label,
        children,
        small,
        classes,
        error,
        helperTextPosition,
        dataAttrs,
        editable,
        affirmative,
        hasAbsoluteError,
        className,
        min,
        max,
        type,
        InputLabelProps,
        onChange,
        loading,
        expand,
        inputProps,
        tiny,
        SelectProps,
        InputProps,
        inputId,
        ...textFieldProps
    } = props;



    const [value, setValue] = React.useState(
        typeof props.value === 'string' ||
            typeof props.value === 'number'
            ? props.value
            : ''
    )

    const errorScrollClassName = React.useMemo(() => {
        if (errorText) {
            return errorGroup
                ? `error-for-scroll-${errorGroup}`
                : `error-for-scroll`;
        }

        return ''
    }, [errorText, errorGroup])

    const validInputId = React.useMemo(() => {

        return inputId || (
            label ? convertToKebabCase(`${label}`) : undefined
        )
    }, [inputId, label])



    const maybeRequiredLabel = React.useMemo(() => !!required
        ? `${label} (required)`
        : label, [required, label])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numberTypes = ['tel', 'number'];
        const minAndMaxExist = typeof min === 'number' && typeof max === 'number';

        const cleanedValue =
            minAndMaxExist &&
                numberTypes.some(eachType => eachType === type) &&
                e.target.value !== ''
                ? clamp(min, max, +e.target.value)
                : e.target.value;

        setValue(cleanedValue)

        if (onChange) {
            if (e.target.value !== cleanedValue) {
                const clonedEvent = {
                    ...e,
                    target: e.target.cloneNode()
                } as React.ChangeEvent<HTMLInputElement>;

                clonedEvent.target.value = `${cleanedValue}`;
                onChange(clonedEvent);
            } else {
                onChange(e);
            }
        }
    }

    return (
        <div
            className={classNames({
                [classes.helpWrapper]: Boolean(tooltipText),
                [errorScrollClassName]: !!errorText
            })}>
            {maybeRequiredLabel && (
                <InputLabel>{maybeRequiredLabel}</InputLabel>
            )}
            {helperText && helperTextPosition === 'top' && (
                <FormHelperText
                    className={classes.helperTextTop}>
                    {helperText}
                </FormHelperText>
            )}
            <div
                className={classNames({
                    [classes.helpWrapperContainer]: Boolean(tooltipText)
                })}>
                <TextField
                    {...textFieldProps}
                    {...dataAttrs}
                    error={!!error || !!errorText}
                    label={''}
                    helperText={''}
                    fullWidth
                    value={value}
                    onChange={handleChange}
                    inputProps={{
                        'data-testid': 'textfield-input',
                        id: validInputId,
                        ...inputProps
                    }}
                    InputProps={{
                        disableUnderline: true,
                        endAdornment: loading && (
                            <InputAdornment position="end">
                                <CircleProgress mini />
                            </InputAdornment>
                        ),
                        className: classNames(
                            'input',
                            {
                                [classes.expand]: expand,
                                [classes.small]: small,
                                [classes.tiny]: tiny,
                                affirmative: !!affirmative
                            },
                            className
                        ),
                        ...InputProps
                    }}
                    SelectProps={{
                        disableUnderline: true,
                        IconComponent: KeyboardArrowDown,
                        MenuProps: {
                            getContentAnchorEl: undefined,
                            anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
                            transformOrigin: { vertical: 'top', horizontal: 'left' },
                            MenuListProps: { className: 'selectMenuList' },
                            PaperProps: { className: 'selectMenuDropdown' }
                        },
                        inputProps: {
                            className: classNames({
                                [classes.selectSmall]: small
                            })
                        },
                        ...SelectProps
                    }}
                    className={classNames(
                        {
                            [classes.helpWrapperTextField]: Boolean(tooltipText),
                            [classes.small]: small,
                            [classes.root]: true
                        },
                        className
                    )}>
                    {children}
                </TextField>
                {tooltipText && <HelpIcon text={tooltipText} />}
                {errorText && (
                    <FormHelperText
                        className={classNames({
                            [classes.errorText]: true,
                            [classes.editable]: editable,
                            [classes.absolute]: editable || hasAbsoluteError
                        })}>
                        {errorText}
                    </FormHelperText>
                )}
            </div>
            {helperText && (helperTextPosition === 'bottom' || !helperTextPosition) && (
                <FormHelperText >
                    {helperText}
                </FormHelperText>
            )}
        </div>
    )
}

const styled = withStyles(styles, { withTheme: true });

export default styled(RuaTextField);