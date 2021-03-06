import React from 'react';
import styled, { css } from 'styled-components';
import { netSpend } from './helpers';

const Overlay = ({ active, hideOverlay, activeWeek }: any) => {
  const debits = active ? netSpend(activeWeek) : '';
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

      {active &&
        activeWeek.map((transaction: any, index: any) => {
          const date = new Date(transaction.timestamp);
          return (
            <SDataCircle
              key={index}
              left={Math.random() * window.innerWidth * 0.5}
              top={Math.random() * window.innerHeight * 0.5}
            >
              <SValue>£{Math.abs(transaction.amount)}</SValue>
              <STitle>{`${date.getDate()}/${date.getMonth()}`}</STitle>
            </SDataCircle>
          );
        })}
      <DataCircle>
        <Value>£{debits}</Value>
        <Title>Debits made</Title>
      </DataCircle>
    </OverlayContainer>
  );
};

const OverlayContainer: any = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 25px;
  -webkit-transform: scale(1.5);
  transform: scale(1.5);
  visibility: hidden;
  opacity: 0;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  @media (max-width: 690px) {
    .stats__overlay {
      padding: 12.5px;
    }
  }
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

const Back = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
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

const DataCircle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 350px;
  height: 350px;
  border-radius: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
  background: #ffffff;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  color: #00b9a7;
`;

const Value = styled.span`
  font-size: 100px;
  font-weight: 700;
`;

const Title = styled.p`
  margin: 0;
`;

const SValue = styled.span`
  font-size: 14px;
  font-weight: 700;
`;

const STitle = styled.p`
  margin: 0;
`;

const SDataCircle: any = styled(DataCircle)`
  width: 100px;
  height: 100px;
  background: #ffffff;
  color: #00b9a7;
  left: ${(props: any) => props.left}px;
  top: ${(props: any) => props.top}px;
  z-index: 1;
  border: 2px solid #00b9a7;
`;

export default Overlay;
