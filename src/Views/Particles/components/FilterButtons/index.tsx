import React from 'react';
import { Button } from '@zopauk/react-components';
import styled from 'styled-components';

const FilterButtons = ({
  handleClick,
  unfiltererdValues,
  filterButtons
}: any) => {
  return (
    <>
      {filterButtons &&
        filterButtons.map((button: any) => {
          return (
            <SButton
              onClick={() => handleClick(button)}
              styling={'contrastSecondary'}
              filteredOut={unfiltererdValues.includes(button)}
            >
              {button}
            </SButton>
          );
        })}
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
