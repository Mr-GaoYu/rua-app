import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { useSnackbar } from "notistack";
interface Props {
  toggleTheme: () => void;
  toggleSpacing: () => void;
  location: RouteComponentProps["location"];
  history: RouteComponentProps["history"];
}

const App: React.FC = (props) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleClick = () => {
    enqueueSnackbar("I love hooks");
  };
  return <button onClick={handleClick}>Show snackbar</button>;
};

export default App;
