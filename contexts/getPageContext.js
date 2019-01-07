/* eslint-disable no-underscore-dangle */

import { SheetsRegistry } from 'jss';
import { createMuiTheme, createGenerateClassName } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

// default theme variables
/*
const { spacing, typography } = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontSize: 12,
  },
});
*/

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontSize: 12,
  },
  palette: {
    primary: {
      light: purple[300],
      main: purple[500],
      dark: purple[700],
    },
    secondary: {
      light: green[300],
      main: green[500],
      dark: green[700],
    },
  },
  overrides: {
    MuiInputLabel: {
      outlined: {
        '&$marginDense': {
          transform: 'translate(14px, .5rem) scale(1)',
        },
        '&$shrink': {
          transform: 'translate(14px, -.175rem) scale(.75)',
        },
      },
    },
    MuiOutlinedInput: {
      inputMarginDense: {
        paddingTop: '.5rem',
        paddingBottom: '.5rem',
      },
      focused: {
        '& legend': {
          lineHeight: '.725rem',
        },
      },
    },
    MuiFormControl: {
      marginDense: {
        marginTop: '.5rem',
        marginBottom: '.25rem',
      },
    },
    MuiSelect: {
      select: {
        paddingTop: '.5rem',
      },
    },
  },
});

function createPageContext() {
  return {
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
    // The standard class name generator.
    generateClassName: createGenerateClassName(),
  };
}

export default function getPageContext() {
  // Make sure to create a new context for every server-side request so that data
  // isn't shared between connections (which would be bad).
  if (!process.browser) {
    return createPageContext();
  }

  // Reuse context on the client-side.
  if (!global.__INIT_MATERIAL_UI__) {
    global.__INIT_MATERIAL_UI__ = createPageContext();
  }

  return global.__INIT_MATERIAL_UI__;
}
