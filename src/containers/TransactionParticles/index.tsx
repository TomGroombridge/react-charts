import React, { useState, useEffect } from 'react';
import Particles from '../../Views/Particles';
import FilterButtons from '../../Views/Particles/components/FilterButtons';
import Overlay from '../../Views/Particles/components/Overlay';
import HeaderText from '../../Views/Particles/components/HeaderText';
import axios from 'axios';
import {
  FlexContainer,
  FlexRow,
  FlexCol,
  Button
} from '@zopauk/react-components';
import { useLocation } from 'react-router-dom';

const TransactionParticles = () => {
  let location = useLocation();
  const [trans, setTrans] = useState([]) as any[];
  const [particles, setParticles] = useState([]) as any[];
  const [unfiltererdValues, setUnfiltererdValues] = useState(['']);
  const [processRunning, setProcessRunning] = useState(false);
  const [activeOverlay, setActiveOverlay] = useState(false);
  const [filterButtons, setFilterButtons] = useState([]) as any[];

  const toggleOverlay = () => {
    setActiveOverlay(!activeOverlay);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    if (code !== null) {
      axios
        .get(`http://localhost:5000/truelayer-redirect?code=${code}`)
        .then((response: any) => {
          setParticles(response.data.results);
          setTrans(response.data.results);
          const result = response.data.results.map(
            (a: any) => a.transaction_category
          );
          const x = [...new Set(result)];
          setFilterButtons(x);
        })
        .catch(() => {
          console.log('ERROR!!!');
        });
    }
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

  // &provider_id=oauth-monzo
  const addBank = (e: any) => {
    e.preventDefault();
    window.location.href =
      'https://auth.truelayer.com/?response_type=code&client_id=pastuso-b0abfa&nonce=1014605873&scope=info%20accounts%20balance%20cards%20transactions%20direct_debits%20standing_orders%20offline_access&redirect_uri=http://localhost:3000/addBankAccount&providers=uk-ob-all%20uk-oauth-all';

    return null;
  };

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
            <Button onClick={e => addBank(e)}>Connect Bank Account</Button>
          </FlexCol>
          <FlexCol style={{ marginBottom: '24px' }}>
            <FilterButtons
              filterButtons={filterButtons}
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
