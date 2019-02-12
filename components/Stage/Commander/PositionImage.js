import React from 'react';

// constants
import { host as assetHost } from '../../../constants/assets';

// components
import ResponsiveImage from '../../ResponsiveImage';

const altTexts = {
  honei: '本営',
  chuei: '中衛',
  zenei: '前衛',
};

const PositionImage = ({ classes, position, horizontal }) => {
  const { positionRoot, positionImage } = classes;
  const suffix = horizontal ? '-h' : '';
  const path = `${assetHost}/assets/positions/${position}${suffix}.png`;
  return (
    <div className={positionRoot}>
      <ResponsiveImage
        className={positionImage}
        alt={altTexts[position]}
        src={path} />
    </div>
  );
};

export default PositionImage;
