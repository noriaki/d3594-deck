/* eslint-disable no-underscore-dangle */

import { SheetsRegistry } from 'jss';
import { createMuiTheme, createGenerateClassName } from '@material-ui/core/styles';

import { viewportMaxWidth } from '../constants/styles';
import { fontStyles } from './fonts';

const defaultFontFamily = ['"Helvetica"', '"Arial"', 'sans-serif'];
const fontFamilyJP = [
  '"Roboto"',
  `"${fontStyles[0].family}"`,
  ...defaultFontFamily,
].join(', ');

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontSize: 12,
    fontFamilyJP,
    fontStyleJP: fontStyles[0].style,
    fontWeightJP: fontStyles[0].weight,
  },
  palette: {
    primary: {
      light: '#6d5388',
      main: '#412a5b',
      dark: '#190131',
      contrastText: '#f0eff0',
    },
    secondary: {
      light: '#ff99b3',
      main: '#f86784',
      dark: '#c13358',
      contrastText: '#04202c',
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
  constants: {
    viewportMaxWidth,
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
