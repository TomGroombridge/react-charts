import React, { useState } from 'react';
import Particles from '../../Views/Particles';
import FilterButtons from '../../Views/Particles/components/FilterButtons';
import transactions from '../../data/transactions.json';
import { FlexContainer, FlexRow, FlexCol } from '@zopauk/react-components';

const TransactionParticles = () => {
  const [particles, setParticles] = useState(transactions.results);

  const handleClick = (category: string) => {
    const filteredParticles = particles.filter(particle => {
      return particle.transaction_category !== category;
    });
    setParticles([...filteredParticles]);
  };

  return (
    <FlexContainer>
      <FlexRow>
        <FlexCol xs={12}>
          <FilterButtons handleClick={handleClick} />
        </FlexCol>
      </FlexRow>
      <FlexRow>
        <FlexCol xs={12}>
          <Particles particles={particles} />
        </FlexCol>
      </FlexRow>
    </FlexContainer>
  );
};

export default TransactionParticles;
