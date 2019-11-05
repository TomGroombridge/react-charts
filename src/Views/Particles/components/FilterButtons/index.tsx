import React from 'react';
import { Button } from '@zopauk/react-components';

const FilterButtons = ({ handleClick }: any) => {
  return (
    <>
      <Button
        onClick={() => handleClick('PURCHASE')}
        styling='contrastSecondary'
      >
        Purchases
      </Button>
      <Button onClick={() => handleClick('ATM')} styling='contrastSecondary'>
        ATM
      </Button>
      <Button onClick={() => handleClick('CREDIT')} styling='contrastSecondary'>
        Credit
      </Button>
      <Button onClick={() => handleClick('DEBIT')} styling='contrastSecondary'>
        Debit
      </Button>
      <Button
        onClick={() => handleClick('DIRECT_DEBIT')}
        styling='contrastSecondary'
      >
        Direct Debit
      </Button>
      <Button
        onClick={() => handleClick('BILL_PAYMENT')}
        styling='contrastSecondary'
      >
        Bill Payment
      </Button>
    </>
  );
};

export default FilterButtons;
