import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { useSnackbar } from "notistack";

interface Props {
  toggleTheme: () => void;
  toggleSpacing: () => void;
  location: RouteComponentProps["location"];
  history: RouteComponentProps["history"];
}

type CombinedProps = Props & RouteComponentProps;

const App: React.FC = (props) => {

  return (
    <React.Fragment>
      2
    </React.Fragment>
  );
};

export default App;
