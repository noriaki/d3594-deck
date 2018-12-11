import React from 'react';
import App, { Container } from 'next/app';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';
import EventListener from 'react-event-listener';
import debounce from 'lodash.debounce';
import getPageContext from '../contexts/getPageContext';

const globalStyles = theme => ({
  '@global': {
    html: {
      height: '100%',
      fontSize: '5vmin',
    },
    body: { height: '100%' },
  },
});

const StyledCssBaseline = withStyles(globalStyles)(CssBaseline);

const setDimensionVars = () => {
  const ivh = window.innerHeight * 0.01;
  const ivw = window.innerWidth * 0.01;
  document.documentElement.style.setProperty('--ivh', `${ivh}px`);
  document.documentElement.style.setProperty('--ivw', `${ivw}px`);
};

class D3594DeckApp extends App {
  constructor(props) {
    super(props);
    this.pageContext = getPageContext();
  }

  handleResize = () => setDimensionVars();

  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
    setDimensionVars();
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <JssProvider
          registry={this.pageContext.sheetsRegistry}
          generateClassName={this.pageContext.generateClassName}>
          <MuiThemeProvider
            theme={this.pageContext.theme}
            sheetsManager={this.pageContext.sheetsManager}>
            <StyledCssBaseline />
            <Component pageContext={this.pageContext} {...pageProps} />
            <EventListener
              target="window"
              onResize={debounce(this.handleResize)} />
          </MuiThemeProvider>
        </JssProvider>
      </Container>
    );
  }
}

export default D3594DeckApp;
