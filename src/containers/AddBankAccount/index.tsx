import React, { useEffect, useState } from 'react';
import { FlexContainer, Heading, Button } from '@zopauk/react-components';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const AddBankAccount = () => {
  let location = useLocation();
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    if (code !== null) {
      axios
        .get(`http://localhost:5000/truelayer-redirect?code=${code}`)
        .then(response => {
          console.log('response', response);
          setAccounts(response.data.results);
        })
        .catch(() => {
          console.log('ERROR!!!');
        });
    }
  }, []);

  const handleClick = (e: any) => {
    e.preventDefault();
    window.location.href =
      'https://auth.truelayer.com/?response_type=code&client_id=pastuso-b0abfa&nonce=1014605873&scope=info%20accounts%20balance%20cards%20transactions%20direct_debits%20standing_orders%20offline_access&redirect_uri=http://localhost:3000/addBankAccount&providers=uk-ob-all%20uk-oauth-all';

    return null;
  };

  console.log('accounts', accounts);

  return (
    <FlexContainer>
      <Heading as={'h1'} color={'#FFFFFF'}>
        Add Bank Account
      </Heading>
      <Button onClick={e => handleClick(e)}>Connect Bank Account</Button>
    </FlexContainer>
  );
};

export default AddBankAccount;
