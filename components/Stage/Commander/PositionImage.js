import React from 'react';

// constants
import { host as assetHost } from '../../../constants/assets';

// components
import ResponsiveImage from '../../ResponsiveImage';

import {
  positionsMap as altTexts,
} from '../../../server/models/classes/Formation';

const PositionImage = ({ classes, position, horizontal }) => {
  const { positionRoot, positionImage } = classes;
  const suffix = horizontal ? '-h' : '';
  const path = `${assetHost}/assets/positions/${position}${suffix}.png`;
  const alt = altTexts.find(a => a.key === position);
  return (
    <div className={positionRoot}>
      <ResponsiveImage
        className={positionImage}
        alt={alt && alt.value}
        src={path} />
    </div>
  );
};

export default PositionImage;
