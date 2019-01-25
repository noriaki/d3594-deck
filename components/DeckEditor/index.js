import React from 'react';

// stores
import { Container as StoreContainer, initialStates } from '../../stores';

// components
import Title from '../Title';
import Stage from '../Stage';
import EditActions from '../EditActions';
import CommanderSearcher from './CommanderSearcher';
import TacticsSearcher from './TacticsSearcher';

const DeckEditor = (props) => {
  const { formation } = props;
  const states = { ...initialStates, formation };
  return (
    <StoreContainer initialStates={states}>
      <Title />
      <Stage edit />
      <EditActions edit />
      <CommanderSearcher />
      <TacticsSearcher />
    </StoreContainer>
  );
};

export default DeckEditor;
