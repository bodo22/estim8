import * as React from 'react';

import blue from '@material-ui/core/colors/blue';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import AppShell from './AppShell';

const theme = createMuiTheme({
  overrides: {
    MuiModal: {
      root: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
      },
    },
    MuiPaper: {
      root: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        margin: '0 auto',
        maxWidth: 500,
        marginBottom: 16,
      }
    }
  },
  palette: {
    primary: blue,
  },
  typography: {
    useNextVariants: true,
  },
});

class App extends React.Component {

  public render() {
    return (
      <MuiThemeProvider theme={theme}>
        <AppShell />
      </MuiThemeProvider>
    );
  }
}

export default App;
