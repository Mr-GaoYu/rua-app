import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import loadDevTools from "./dev-tools/load";
import { Provider } from "react-redux";
import store from "src/store";
import {
  BrowserRouter,
  Route,
  RouteComponentProps,
  Switch,
} from "react-router-dom";
import "./index.css";

const renderNull = () => <span>null route</span>;

const renderAuthentication = () => (
  <React.Suspense fallback={null}>
   
  </React.Suspense>
)

loadDevTools(() => {
  ReactDOM.render(
    navigator.cookieEnabled ? (
      <Provider store={store}>
        {/* <BrowserRouter>
          <Switch>
            <Route exact path="/null" render={renderNull} />
            <Route  render={renderAuthentication} />
          </Switch>
        </BrowserRouter> */}
         <App />
      </Provider>
    ) : null,
    document.getElementById("root") as HTMLElement
  );
});
