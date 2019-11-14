import React, { useState, useEffect } from "react";
import Particles from "../../Views/Particles";
import FilterButtons from "../../Views/Particles/components/FilterButtons";
import Overlay from "../../Views/Particles/components/Overlay";
import HeaderText from "../../Views/Particles/components/HeaderText";
import {
  FlexContainer,
  FlexRow,
  FlexCol,
  Button,
  Heading,
  colors
} from "@zopauk/react-components";
import styled from "styled-components";
import { useCookies } from "react-cookie";
import axios from "axios";

const TransactionParticles = () => {
  const [trans, setTrans] = useState();
  const [particles, setParticles] = useState();
  const [unfiltererdValues, setUnfiltererdValues] = useState([""]);
  const [processRunning, setProcessRunning] = useState(false);
  const [activeOverlay, setActiveOverlay] = useState(false);
  const [filterButtons, setFilterButtons] = useState();
  const [loading, setLoading] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);

  const toggleOverlay = () => {
    setActiveOverlay(!activeOverlay);
  };

  useEffect(() => {
    const accessToken = cookies.accessToken;
    setLoading(true);
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
          {particles && particles.length > 0 && (
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
