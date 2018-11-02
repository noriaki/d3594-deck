import React from 'react';

import Commander from './Commander';

const positions = ['honei', 'chuei', 'zenei'];

const Formation = ({ commanders }) => commanders.map((commander, i) => (
  <Commander
    key={commander.id}
    commander={commander}
    position={positions[i]} />
));

export default Formation;
