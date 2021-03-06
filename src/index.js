import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { ThemeProvider } from '@material-ui/styles';

import theme from './theme'
import { RoutesContextProvider } from './context/RoutesContext';
import { StopsContextProvider } from './context/StopContext';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider theme={theme}>
        <RoutesContextProvider>
          <StopsContextProvider>
            <App />
          </StopsContextProvider>
        </RoutesContextProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
