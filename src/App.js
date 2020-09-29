import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import { theme } from './styles';
import { Payment, Result } from './pages'

function App() {
  return (
    <Router>
      <div className="flex container items-center justify-center h-100vh">
        <ThemeProvider theme={theme}>
          <Switch>
            <Route
              path="/"
              exact
              component={Payment}
            />
            <Route
              path="/result"
              exact
              component={Result}
            />
          </Switch>
        </ThemeProvider>
      </div>
    </Router>
  );
}

export default App;
