import React, { Fragment, useEffect, useRef } from 'react';

// canvas (konva)
import {
  Stage,
  Layer,
  Rect,
  Circle,
  Text,
} from 'react-konva';

// material-ui
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({});

export const FormationImageComponent = ({ classes }) => {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  useEffect(() => {
    if (canvasRef.current && imageRef.current) {
      const data = canvasRef.current.toDataURL();
      imageRef.current.src = data;
    }
  });

  return (
    <Fragment>
      <Paper square>
        <Stage width={300} height={200} ref={canvasRef}>
          <Layer>
            <Circle x={100} y={100} radius={50} fill="green" />
          </Layer>
          <Layer>
            <Text text="TTT Canvas" />
            <Rect
              x={20}
              y={20}
              width={100}
              height={100}
              fill="#fff"
              shadowBlur={5} />
          </Layer>
        </Stage>
      </Paper>
      <Paper>
        <img alt="canvas" width={300} height={200} ref={imageRef} />
      </Paper>
    </Fragment>
  );
};

export default withStyles(styles)(FormationImageComponent);
