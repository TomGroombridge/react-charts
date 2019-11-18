import React, { useEffect } from 'react';
import { FlexContainer, Heading, Button } from '@zopauk/react-components';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import history from '../../history';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const AddBankAccount = () => {
  const [cookies, setCookie] = useCookies([]);
  let location = useLocation();

  const {
    REACT_APP_TRUELAYER_URL,
    REACT_APP_TRUELAYER_CLIENT_ID,
    REACT_APP_TRUELAYER_SCOPES,
    REACT_APP_TRUELAYER_REDIRECT_URI
  } = process.env;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    if (code !== null) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/fetch-access-token?code=${code}`)
        .then(async (response: any) => {
          const accessToken = response.data.access_token;
          await setCookie('accessToken', accessToken, { path: '/' });
          history.push('/transactions');
        })
        .catch(error => {
          console.log('ERROR!', error);
        });
    }
  }, []);

  const handleClick = (e: any) => {
    e.preventDefault();
    window.location.href = `${REACT_APP_TRUELAYER_URL}/?response_type=code&client_id=${REACT_APP_TRUELAYER_CLIENT_ID}&nonce=1014605873&scope=${REACT_APP_TRUELAYER_SCOPES}&redirect_uri=${REACT_APP_TRUELAYER_REDIRECT_URI}&providers=uk-ob-all%20uk-oauth-all`;

    return null;
  };

  return (
    <FormLayout>
      <SFlexContainer>
        <Heading as={'h1'} color={'#FFFFFF'}>
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
