import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import App from "./App";
import theme from "./theme";
import NavigationContextProvider from "./contexts/NavigationContext";
import MemosContextProvider from "./contexts/MemosContext";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { ThemeProvider } from "styled-components";

ReactDOM.render(
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavigationContextProvider>
          <MemosContextProvider>
            <App />
          </MemosContextProvider>
        </NavigationContextProvider>
      </ThemeProvider>
    </MuiThemeProvider>
  </MuiPickersUtilsProvider>,
  document.querySelector("#root")
);
