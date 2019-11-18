import React from 'react';
import styled, { css } from 'styled-components';
import {
  FlexContainer,
  FlexRow,
  FlexCol,
  Text,
  Modal,
  Heading
} from '@zopauk/react-components';
import TransactionCard from '../TransactionCard';

const Overlay = ({ active, hideOverlay, activeWeek }: any) => {
  return (
    <OverlayContainer active={active}>
      <Back onClick={() => hideOverlay()}>
        <svg
          fill='white'
          xmlns='http://www.w3.org/2000/svg'
          width='36'
          height='36'
          viewBox='0 0 36 36'
        >
          <path d='M30 16.5H11.74l8.38-8.38L18 6 6 18l12 12 2.12-2.12-8.38-8.38H30v-3z'></path>
        </svg>
        <p>Back</p>
      </Back>
      <br />
      <FlexRow>
        <FlexCol xs={12} m={12}>
          <FlexRow style={{ marginBottom: '1em', color: '#FFFFFF' }}>
            <SFlexCol xs={3}>
              <SText as={'label'}>Merchant Name</SText>
            </SFlexCol>
            <SFlexCol xs={2}>
              <SText as={'label'}>Date</SText>
            </SFlexCol>
            <SFlexCol xs={3}>
              <SText as={'label'}>Amount</SText>
            </SFlexCol>
            <SFlexCol xs={2}>
              <SText as={'label'}>#</SText>
            </SFlexCol>
            <SFlexCol xs={2}>
              <SText as={'label'}>Category</SText>
            </SFlexCol>
          </FlexRow>

          {activeWeek.map((transaction: any, index: any) => {
            return (
              <TransactionCard
                merchant={transaction.merchant_name}
                amount={transaction.amount}
                category={transaction.transaction_category}
                description={transaction.description}
                timestamp={transaction.timestamp}
                key={index}
              />
            );
          })}
        </FlexCol>
      </FlexRow>
    </OverlayContainer>
  );
};

const OverlayContainer: any = styled(FlexContainer)`
  -webkit-transform: scale(1.5);
  transform: scale(1.5);
  visibility: hidden;
  opacity: 0;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  ${(props: any) =>
    props.active &&
    css`
      opacity: 1;
      visibility: visible;
      -webkit-transform: none;
      transform: none;
      transition-delay: 0.9s;
    `}
`;

const SFlexCol = styled(FlexCol)`
  align-self: center;
`;

const SText = styled(Text)`
  color: #ffffff;
`;

const Back = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #fff;
  > svg {
    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  }
  &:hover > svg {
    -webkit-transform: translateX(-5px);
    transform: translateX(-5px);
  }
  > p {
    font-weight: 700;
    font-size: 24px;
    margin: 0 0 0 12.5px;
    @media (max-width: 690px) {
      font-size: 18px;
    }
  }
`;

export default Overlay;
