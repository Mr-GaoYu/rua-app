import React from "react";
import { SnackbarProvider, SnackbarProviderProps } from "notistack";
import CloseSnackbar from './CloseSnackbar';

export type CombinedProps = SnackbarProviderProps

const SnackBar: React.FC<CombinedProps> = (props) => {
  const { children, ...rest } = props;
  const notistackRef: React.Ref<SnackbarProvider> = React.createRef();
  const onClickDismiss = (key: string | number | undefined) => () => {
    notistackRef?.current?.closeSnackbar(key);
  };

  return (
    <SnackbarProvider
      ref={notistackRef}
      {...rest}
      action={key => (
        <CloseSnackbar
          onClick={onClickDismiss(key)}
          text="Dismiss Notification"
        />
      )}>
      {children}
    </SnackbarProvider>
  );
};


export default SnackBar;
