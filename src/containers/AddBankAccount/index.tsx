import React, { useEffect } from "react";
import { FlexContainer, Heading, Button } from "@zopauk/react-components";
import { useCookies } from "react-cookie";
import axios from "axios";
import history from "../../history";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const AddBankAccount = () => {
  const [cookies, setCookie] = useCookies([]);
  let location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");
    if (code !== null) {
      axios
        .get(`http://localhost:5000/fetch-access-token?code=${code}`)
        .then(async (response: any) => {
          const accessToken = response.data.access_token;
          await setCookie("accessToken", accessToken, { path: "/" });
          history.push("/transactions");
        })
        .catch(error => {
          console.log("ERROR!", error);
        });
    }
  }, []);

  const handleClick = (e: any) => {
    e.preventDefault();
    window.location.href =
      "https://auth.truelayer.com/?response_type=code&client_id=pastuso-b0abfa&nonce=1014605873&scope=info%20accounts%20balance%20cards%20transactions%20direct_debits%20standing_orders%20offline_access&redirect_uri=http://localhost:3000/addBankAccount&providers=uk-ob-all%20uk-oauth-all";

    return null;
  };

  return (
    <FormLayout>
      <SFlexContainer>
        <Heading as={"h1"} color={"#FFFFFF"}>
          Add Bank Account
        </Heading>
        <Button onClick={e => handleClick(e)}>Connect Bank Account</Button>
      </SFlexContainer>
    </FormLayout>
  );
};

const SFlexContainer: any = styled(FlexContainer)`
  text-align: center;
`;

const FormLayout = styled.div`
  position: relative;
  top: 30vh;
  text-align: center;
  @media screen and (max-width: 768px) {
    top: 10vh;
  }
`;

export default AddBankAccount;
