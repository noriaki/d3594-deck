import React from 'react';

// canvas (konva)
import {
  Stage,
  Layer,
  Rect,
  Text,
} from 'react-konva';

// material-ui
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({});

export const FormationImageComponent = ({ classes }) => (
  <Paper square>
    <Stage width={300} height={200} onClick={handleClickToDownload} onTap={handleClickToDownload}>
      <Layer>
        <Text text="TTT Canvas" />
        <Rect
          x={20}
          y={20}
          width={50}
          height={50}
          fill="#fff"
          shadowBlur={5} />
      </Layer>
    </Stage>
  </Paper>
);

export default withStyles(styles)(FormationImageComponent);

const handleClickToDownload = (event) => {
  console.log(event.target);
  const data = event.target.toDataURL({
    mimeTyep: 'image/jpeg',
    quality: 0.8,
  });
  const link = document.createElement('a');
  link.href = data;
  link.download = 'file.jpg';
  link.click();
};
