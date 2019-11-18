import React from 'react';
import styled, { css } from 'styled-components';
import { ZopaIcon, colors } from '@zopauk/react-components';

const Header = ({ active }) => {
  return (
    <SHeader active={active}>
      <ZopaIcon width='150px' color={colors.neutral.white} />
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
  margin-bottom: 50px;
`;

export default Header;
