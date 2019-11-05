import React, { useState, useEffect } from 'react';
import Particles from '../../Views/Particles';
import FilterButtons from '../../Views/Particles/components/FilterButtons';
import transactions from '../../data/transactions.json';
import {
  FlexContainer,
  FlexRow,
  FlexCol,
  Heading,
  Text,
  Button
} from '@zopauk/react-components';

const TransactionParticles = () => {
  const [trans, setTrans] = useState([]) as any[];
  const [particles, setParticles] = useState([]) as any[];
  const [unfiltererdValues, setUnfiltererdValues] = useState(['']);
  const [processRunning, setProcessRunning] = useState(false);

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
    <FlexContainer>
      <FlexRow>
        <FlexCol xs={12}>
          <Heading as={'h1'} color={'#FFFFFF'}>
            Account Transactions
          </Heading>
          <Text as={'p'} size={'lead'} color={'#FFFFFF'}>
            Here is a list of transactions you have made on your account over
            the path 3 months.
          </Text>
          <Text as={'p'} size={'lead'} color={'#FFFFFF'}>
            Click the buttons below to filter by certain transaction types
          </Text>
          <br />
        </FlexCol>
      </FlexRow>
      <FlexRow align={'center'}>
        <FlexCol xs={12} style={{ marginBottom: '24px' }}>
          <FilterButtons
            handleClick={handleClick}
            unfiltererdValues={unfiltererdValues}
          />
        </FlexCol>
        <FlexCol xs={12}>
          <Button
            onClick={() => console.log('show stuff')}
            styling={'contrastSecondary'}
          >
            Show Transactions
          </Button>
        </FlexCol>
      </FlexRow>
      <FlexRow>
        <FlexCol xs={12}>
          {particles.length > 0 && (
            <Particles particles={particles} processRunning={processRunning} />
          )}
        </FlexCol>
      </FlexRow>
    </FlexContainer>
  );
};

export default TransactionParticles;
