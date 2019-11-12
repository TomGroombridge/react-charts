import React, { useState, useEffect } from "react";
import Particles from "../../Views/Particles";
import FilterButtons from "../../Views/Particles/components/FilterButtons";
import Overlay from "../../Views/Particles/components/Overlay";
import HeaderText from "../../Views/Particles/components/HeaderText";
import axios from "axios";
import {
  FlexContainer,
  FlexRow,
  FlexCol,
  Button,
  Heading,
  colors
} from "@zopauk/react-components";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useCookies } from "react-cookie";

const TransactionParticles = () => {
  let location = useLocation();
  const [trans, setTrans] = useState();
  const [particles, setParticles] = useState();
  const [unfiltererdValues, setUnfiltererdValues] = useState([""]);
  const [processRunning, setProcessRunning] = useState(false);
  const [activeOverlay, setActiveOverlay] = useState(false);
  const [filterButtons, setFilterButtons] = useState();
  const [loading, setLoading] = useState(false);
  const [cookies, setCookie] = useCookies([]);

  const toggleOverlay = () => {
    setActiveOverlay(!activeOverlay);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");
    if (code !== null) {
      setLoading(true);
      axios
        .get(`http://localhost:5000/truelayer-redirect?code=${code}`)
        .then(async (response: any) => {
          const accessToken = response.data.access_token;
          await setCookie("accessToken", accessToken, { path: "/" });
          axios
            .get(`http://localhost:5000/accounts`, {
              headers: {
                authorization: accessToken
              }
            })
            .then(accountResponse => {
              setParticles(accountResponse.data.results);
              setTrans(accountResponse.data.results);
              const result = accountResponse.data.results.map(
                (a: any) => a.transaction_category
              );
              const x = [...new Set(result)];
              setFilterButtons(x);
              setLoading(false);
            })
            .catch(error => {
              console.log("ERROR!!!", error);
              setLoading(false);
            });
        })
        .catch(error => {
          console.log("ERROR!!!", error);
          setLoading(false);
        });
    }
  }, []);

  useEffect(() => {
    if (!trans) {
      return;
    }
    const filteredParticles =
      trans &&
      trans.filter((particle: any) => {
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
      "https://auth.truelayer.com/?response_type=code&client_id=pastuso-b0abfa&nonce=1014605873&scope=info%20accounts%20balance%20cards%20transactions%20direct_debits%20standing_orders%20offline_access&redirect_uri=http://localhost:3000/addBankAccount&providers=uk-ob-all%20uk-oauth-all";

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
                <Heading as={"h1"} color={"#FFFFFF"}>
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
          {particles && particles.length > 0 ? (
            <>
              <FlexRow>
                <HeaderText />
              </FlexRow>
              <FlexRow>
                <FlexCol style={{ marginBottom: "24px" }}>
                  <FilterButtons
                    filterButtons={filterButtons}
                    handleClick={handleClick}
                    unfiltererdValues={unfiltererdValues}
                  />
                </FlexCol>
                <FlexCol>
                  <Button
                    onClick={() => toggleOverlay()}
                    styling="contrastPrimary"
                    contrastColor={colors.base.primary}
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
                  <Heading as={"h1"} color={"#FFFFFF"}>
                    Connect bank to view transactions
                  </Heading>
                  <Button
                    onClick={e => addBank(e)}
                    styling="contrastPrimary"
                    contrastColor={colors.base.primary}
                  >
                    Connect Bank Account
                  </Button>
                </SFlexCol>
              </FlexRow>
            </FormLayout>
          )}
        </SFlexContainer>

        {particles && (
          <Overlay
            active={activeOverlay}
            activeWeek={particles}
            hideOverlay={toggleOverlay}
          />
        )}
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
  display: ${(props: any) => (props.activeOverlay ? "block" : "none")};
  text-align: center;
`;

export default TransactionParticles;
