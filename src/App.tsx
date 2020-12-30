import React from "react";
import Axios from "axios";
import withPreferences, {
  PreferencesActionsProps,
} from "src/containers/preferences.container";
function App(props) {
  React.useEffect(() => {
    props.getUserPreferences();
  }, []);
  return <div className="App">111</div>;
}

export default withPreferences()(App);
