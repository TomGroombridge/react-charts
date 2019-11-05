import React from 'react';
import { Button } from '@zopauk/react-components';
import styled from 'styled-components';

const FilterButtons = ({ handleClick, unfiltererdValues }: any) => {
  return (
    <>
      <SButton
        onClick={() => handleClick('PURCHASE')}
        styling={'contrastSecondary'}
        filteredOut={unfiltererdValues.includes('PURCHASE')}
      >
        Purchases
      </SButton>
      <SButton
        onClick={() => handleClick('ATM')}
        styling={'contrastSecondary'}
        filteredOut={unfiltererdValues.includes('ATM')}
      >
        ATM
      </SButton>
      <SButton
        onClick={() => handleClick('CREDIT')}
        filteredOut={unfiltererdValues.includes('CREDIT')}
        styling={'contrastSecondary'}
      >
        Credit
      </SButton>
      <SButton
        onClick={() => handleClick('DEBIT')}
        styling={'contrastSecondary'}
        filteredOut={unfiltererdValues.includes('DEBIT')}
      >
        Debit
      </SButton>
      <SButton
        onClick={() => handleClick('DIRECT_DEBIT')}
        styling={'contrastSecondary'}
        filteredOut={unfiltererdValues.includes('DIRECT_DEBIT')}
      >
        Direct Debit
      </SButton>
      <SButton
        onClick={() => handleClick('BILL_PAYMENT')}
        styling={'contrastSecondary'}
        filteredOut={unfiltererdValues.includes('BILL_PAYMENT')}
      >
        Bill Payment
      </SButton>
    </>
  );
};

const SButton: any = styled(Button)`
  ${(props: any) =>
    props.filteredOut &&
    `
    text-decoration: line-through
  `}
`;

export default FilterButtons;
