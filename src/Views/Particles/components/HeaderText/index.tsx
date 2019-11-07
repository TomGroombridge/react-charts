import React from 'react';
import { FlexCol, Heading, Text } from '@zopauk/react-components';

const HeaderText = () => {
  return (
    <FlexCol>
      <Heading as={'h1'} color={'#FFFFFF'}>
        Account Transactions
      </Heading>
      <Text as={'p'} size={'lead'} color={'#FFFFFF'}>
        Here is a list of transactions you have made on your account over the
        past 3 months.
      </Text>
      <Text as={'p'} size={'lead'} color={'#FFFFFF'}>
        Click the buttons below to filter by certain transaction types
      </Text>
      <br />
    </FlexCol>
  );
};

export default HeaderText;
