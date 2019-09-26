import React from 'react';
import styled, { css } from 'styled-components';

const Header = ({ active }) => {
  return (
    <SHeader active={active}>
      <Title>
        <p>8</p>
      </Title>
      <SubTitle>
        <p>Car Loans</p>
      </SubTitle>
    </SHeader>
  );
};

const SHeader = styled.header`
  display: flex;
  align-items: center;
  -webkit-transform: translate3d(0, -150px, 0);
  transform: translate3d(0, -150px, 0);
  opacity: 0;
  -webkit-transform-origin: left center;
  transform-origin: left center;
  transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
  ${props =>
    props.active &&
    css`
      -webkit-transform: none;
      transform: none;
      opacity: 1;
    `}
`;

const Title = styled.p`
  font-size: 80px;
  margin: 0;
  font-weight: 700;
  margin-right: 25px;
`;

const SubTitle = styled.p`
  display: block;
  color: white;
  font-weight: 700;
  font-size: 36px;
  line-height: 0.8;
`;

export default Header;
