import React from "react";
import Grid from "src/components/core/Grid";
import { storage, DevToolsEnv } from "src/utilities/storage";

export const getOptions = (env: typeof process.env) => {
  const envVariables = Object.keys(env);

  return envVariables.reduce<DevToolsEnv[]>((acc, thisEnvVariable) => {
    const parsed = /REACT_APP_DEV_TOOLS_ENV_(.)_LABEL/.exec(thisEnvVariable);
    if (!parsed) {
      return acc;
    }

    const num = parsed[1];
    const base = `REACT_APP_DEV_TOOLS_ENV_${num}`;

    return [
      ...acc,
      {
        label: env[thisEnvVariable] ?? "",
        apiRoot: env[`${base}_API_ROOT`] ?? "",
        loginRoot: env[`${base}_LOGIN_ROOT`] ?? "",
        clientID: env[`${base}_CLIENT_ID`] ?? "",
      },
    ];
  }, []);
};

const options = getOptions(process.env);

const EnvironmentToggleTool: React.FC<{}> = () => {
  const [selectedOption, setSelectedOption] = React.useState(0);

  const localStorageEnv = storage.devToolsEnv.get();
  const currentEnvLabel = localStorageEnv?.label;

  return (
    <Grid container>
      <Grid item xs={12}>
        <h4>Environment</h4>
      </Grid>
      <Grid item xs={12}>
        <select
          onBlur={(e) => {
            const selectedIndex = options.findIndex(
              (o) => o.label === e.target.value
            );
            setSelectedOption(Math.max(selectedIndex, 0));
          }}
          defaultValue={currentEnvLabel}
        >
          <option value="" disabled>
            Select a Environment
          </option>
          {options.map((thisOption) => {
            const { label } = thisOption;
            return (
              <option key={label} value={label}>
                {label}
              </option>
            );
          })}
        </select>
        <button
          style={{ marginLeft: 8 }}
          onClick={() => {
            const selected = options[selectedOption];
            if (selected) {
              storage.devToolsEnv.set(selected);
              window.location.reload();
            }
          }}
        >
          刷新
        </button>
      </Grid>
    </Grid>
  );
};

export default React.memo(EnvironmentToggleTool);
