import React from "react";
import { SnackbarProvider } from "notistack";

const SnackBar: React.FC = (props) => {
  const { children } = props;
  const notistackRef: React.Ref<SnackbarProvider> = React.createRef();
  console.log(111)


  return <SnackbarProvider ref={notistackRef}>{children}</SnackbarProvider>;
};

export default SnackBar;
