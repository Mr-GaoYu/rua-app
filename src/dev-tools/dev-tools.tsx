import React from "react";
import ReactDOM from "react-dom";
import Grid from "src/components/core/Grid";
import { isProductionBuild } from "src/constants";
import EnvironmentToggleTool from "./EnvironmentToggleTool";
import MockDataTool from "./MockDataTool";

import "./dev-tools.css";

export const install = () => {
  (window as any).devToolsEnabled = true;

  const DevTools = () => {
    return (
      <div id="dev-tools">
        <div>🛠</div>
        <Grid container spacing={2} className="tools">
          {process.env.NODE_ENV === "development" && (
            <Grid item xs={2}>
              <EnvironmentToggleTool />
            </Grid>
          )}
          {!isProductionBuild && (
            <Grid item xs={2}>
              <MockDataTool />
            </Grid>
          )}
        </Grid>
      </div>
    );
  };

  const devToolsRoot = document.createElement("div");
  document.body.appendChild(devToolsRoot);
  ReactDOM.render(<DevTools />, devToolsRoot);
};
