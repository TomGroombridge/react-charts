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
  Button,
  Heading
} from '@zopauk/react-components';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const TransactionParticles = () => {
  let location = useLocation();
  const [trans, setTrans] = useState([]) as any[];
  const [particles, setParticles] = useState([]) as any[];
  const [unfiltererdValues, setUnfiltererdValues] = useState(['']);
  const [processRunning, setProcessRunning] = useState(false);
  const [activeOverlay, setActiveOverlay] = useState(false);
  const [filterButtons, setFilterButtons] = useState([]) as any[];
  const [loading, setLoading] = useState(false);

  const toggleOverlay = () => {
    setActiveOverlay(!activeOverlay);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    if (code !== null) {
      setLoading(true);
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
          setLoading(false);
        })
        .catch(() => {
          console.log('ERROR!!!');
          setLoading(false);
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

  if (loading) {
    return (
      <>
        <SFlexContainer activeOverlay={true}>
          <FormLayout>
            <FlexRow>
              <SFlexCol>
                <Heading as={'h1'} color={'#FFFFFF'}>
                  Loading...
                </Heading>
              </SFlexCol>
            </FlexRow>
          </FormLayout>
        </SFlexContainer>
      </>
    );
  } else {
    return (
      <>
        <SFlexContainer activeOverlay={!activeOverlay}>
          {particles.length > 0 ? (
            <>
              <FlexRow>
                <HeaderText />
              </FlexRow>
              <FlexRow>
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
                  <Particles
                    particles={particles}
                    processRunning={processRunning}
                  />
                </FlexCol>
              </FlexRow>
            </>
          ) : (
            <FormLayout>
              <FlexRow>
                <SFlexCol>
                  <Heading as={'h1'} color={'#FFFFFF'}>
                    Connect bank to view transactions
                  </Heading>
                  <Button onClick={e => addBank(e)}>
                    Connect Bank Account
                  </Button>
                </SFlexCol>
              </FlexRow>
            </FormLayout>
          )}
        </SFlexContainer>

        <Overlay
          active={activeOverlay}
          activeWeek={particles}
          hideOverlay={toggleOverlay}
        />
      </>
    );
  }
};

const FormLayout = styled.div`
  position: relative;
  top: 30vh;
  text-align: center;
  @media screen and (max-width: 768px) {
    top: 10vh;
  }
`;

const SFlexCol = styled(FlexCol)`
  margin-top: 24px;
`;

const SFlexContainer: any = styled(FlexContainer)`
  display: ${(props: any) => (props.activeOverlay ? 'block' : 'none')};
  text-align: center;
`;

export default TransactionParticles;
