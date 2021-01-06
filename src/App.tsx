import React from "react";
import { RouteComponentProps } from "react-router-dom";
import Menu from 'src/components/Menu'

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
      <Menu />
    </React.Fragment>
  );
};

export default App;
