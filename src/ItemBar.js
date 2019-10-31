import React from 'react';
import styled, { css } from 'styled-components';

const ItemBar = ({ active, delay, data, xAxis, showOverlay, height }) => {
  return (
    <StatsItem onClick={() => showOverlay(data)}>
      <StatsItemNum active={active} delay={delay}>
        {xAxis}
      </StatsItemNum>
      <StatsBar active={active} delay={delay} data={data} height={height} />
    </StatsItem>
  );
};

const StatsBar = styled.div`
  ${props => css`
    height: ${props.height}px;
  `}
  order: 0;
  width: 40px;
  background: white;
  -webkit-transform: scaleY(0) translate3d(0, 0, 0);
  transform: scaleY(0) translate3d(0, 0, 0);
  cursor: pointer;
  -webkit-transform-origin: center bottom;
  transform-origin: center bottom;
  transition: all 01s cubic-bezier(0.23, 1, 0.32, 1);
  box-shadow: 10px 15px rgba(0, 0, 0, 0.2);
  ${props =>
    props.active &&
    css`
      -webkit-transform: none;
      transform: none;
      transition-delay: ${props.delay}s;
    `}
  @media (max-width: 690px) {
    ${props => css`
      width: ${(props.data / 300) * 100}%;
    `}
    height: 30px;
  }
`;

const StatsItem = styled.li`
  height: 400px;
  display: flex;
  flex-direction: column-reverse;
  float: left;
  position: relative;
  text-align: center;
  margin-right: 37.5px;
  -webkit-perspective: 1000px;
  perspective: 1000px;
  transition: all 0.4s ease-in-out;
  @media (max-width: 690px) {
    float: none;
    height: auto;
    width: 100%;
    flex-direction: row;
    align-items: center;
  }
`;

const StatsItemNum = styled.p`
  margin-top: 25px;
  opacity: 0;
  ${props =>
    props.active &&
    css`
      transition: opacity ${props.delay}s;
      transition-delay: ${props.delay}s;
      opacity: 1;
    `}
  @media (max-width: 690px) {
    margin-right: 25px;
  }
`;

export default ItemBar;
