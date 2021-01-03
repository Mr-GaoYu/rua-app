import React from 'react';
import { ThemeProvider } from 'src/components/core/styles';
import { safelyGetTheme } from 'src/ThemeWrapper';
import { Provider } from 'react-redux';
import store from 'src/store';
import {
    BrowserRouter,
    Route,
    Switch,
} from "react-router-dom";
import {
    dark,
    light
} from "src/theme";

const themes = {
    dark,
    light
}



const ThemeDecorator = (Story, context) => {
    const theme = safelyGetTheme(themes, context.globals.theme);
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route render={() =>
                        <ThemeProvider theme={theme(8)}>
                            <Story {...context} />
                        </ThemeProvider>
                    } />
                </Switch>

            </BrowserRouter>

        </Provider>

    )
}

export default ThemeDecorator;
