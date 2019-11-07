import React, { useState, useEffect } from 'react';
import Particles from '../../Views/Particles';
import FilterButtons from '../../Views/Particles/components/FilterButtons';
import transactions from '../../data/transactions.json';
import Overlay from '../../Views/Particles/components/Overlay';
import HeaderText from '../../Views/Particles/components/HeaderText';
import {
  FlexContainer,
  FlexRow,
  FlexCol,
  Button
} from '@zopauk/react-components';

const TransactionParticles = () => {
  const [trans, setTrans] = useState([]) as any[];
  const [particles, setParticles] = useState([]) as any[];
  const [unfiltererdValues, setUnfiltererdValues] = useState(['']);
  const [processRunning, setProcessRunning] = useState(false);
  const [activeOverlay, setActiveOverlay] = useState(true);

  const toggleOverlay = () => {
    setActiveOverlay(!activeOverlay);
  };

  useEffect(() => {
    const data = transactions.results;
    setTrans(data);
    setParticles(data);
  }, []);

  useEffect(() => {
    if (trans.length === 0) {
      return;
    }
    const filteredParticles = trans.filter((particle: any) => {
      return (
        unfiltererdValues.indexOf(particle.transaction_category as any) < 0
      );
    });

    setParticles([...filteredParticles]);
    setProcessRunning(false);
  }, [unfiltererdValues]);

  const handleClick = (category: string) => {
    setProcessRunning(true);
    if (unfiltererdValues.includes(category)) {
      let index = unfiltererdValues.indexOf(category, 0);
      unfiltererdValues.splice(index, 1);
      setUnfiltererdValues([...unfiltererdValues]);
    } else {
      setUnfiltererdValues([category, ...unfiltererdValues]);
    }
  };

  return (
    <>
      <FlexContainer style={{ display: activeOverlay ? 'none' : 'block' }}>
        <FlexRow>
          <HeaderText />
        </FlexRow>
        <FlexRow>
          <FlexCol style={{ marginBottom: '24px' }}>
            <FilterButtons
              handleClick={handleClick}
              unfiltererdValues={unfiltererdValues}
            />
          </FlexCol>
          <FlexCol>
            <Button
              onClick={() => toggleOverlay()}
              styling={'contrastSecondary'}
            >
              Show Transactions
            </Button>
          </FlexCol>
        </FlexRow>
        <FlexRow>
          <FlexCol>
            {particles.length > 0 && (
              <Particles
                particles={particles}
                processRunning={processRunning}
              />
            )}
          </FlexCol>
        </FlexRow>
      </FlexContainer>

      <Overlay
        active={activeOverlay}
        activeWeek={particles}
        hideOverlay={toggleOverlay}
      />
    </>
  );
};

export default TransactionParticles;
