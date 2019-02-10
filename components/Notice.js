import React, { PureComponent } from 'react';

// material-ui
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    padding: `0 ${theme.spacing.unit}px`,
    margin: `${theme.spacing.unit}px 0`,
  },
  text: {
    lineHeight: 1.2,
  },
  url: {
    fontSize: '.6em',
  },
});

class NoticeComponent extends PureComponent {
  state = { url: null };

  componentDidMount = () => this.setState({ url: getCurrentUrl() });

  render = () => {
    const { url } = this.state;
    const { classes: { container, text, url: urlStyle } } = this.props;
    const urlField = url && (
      <TextField
        // className={classes.textField}
        label="URL"
        fullWidth
        margin="dense"
        InputProps={{ readOnly: true, className: urlStyle }}
        value={url}
        variant="filled" />
    );

    return (
      <div className={container}>
        <Typography color="textSecondary" variant="body2" className={text}>
          現在、保存した部隊編成を一覧表示する機能がありません。
          そのため、この部隊編成を記録しておきたい場合は、
          以下のURLを記録しておいてください。
        </Typography>
        { urlField }
      </div>
    );
  };
}

export default withStyles(styles)(NoticeComponent);

const getCurrentUrl = () => {
  const { protocol, host, pathname } = new URL(document.location.href);
  return `${protocol}//${host}${pathname}`;
};
