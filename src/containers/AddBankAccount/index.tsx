import React, { useEffect, useState } from 'react';
import { FlexContainer, Heading, Button } from '@zopauk/react-components';

const AddBankAccount = () => {
  const handleClick = (e: any) => {
    e.preventDefault();
    window.location.href =
      'https://auth.truelayer.com/?response_type=code&client_id=pastuso-b0abfa&nonce=1014605873&scope=info%20accounts%20balance%20cards%20transactions%20direct_debits%20standing_orders%20offline_access&redirect_uri=http://localhost:3000/addBankAccount&providers=uk-ob-all%20uk-oauth-all';

    return null;
  };

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
