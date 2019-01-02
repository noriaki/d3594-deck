import React from 'react';

// stores
import { Container as StoreContainer, initialStates } from '../../stores';

// components
import Title from '../Title';
import Stage from './Stage';
import CommanderSearcher from './CommanderSearcher';

const DeckEditor = (props) => {
  const { formation } = props;
  const states = { ...initialStates, formation };
  return (
    <StoreContainer initialStates={states}>
      <Title />
      <Stage edit />
      <CommanderSearcher />
    </StoreContainer>
  );
};

export default DeckEditor;
