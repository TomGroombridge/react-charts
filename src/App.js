import React, { useEffect, useState } from 'react';
import ItemBar from './ItemBar';
import styled from 'styled-components';
import Overlay from './Overlay';
import Header from './Header';
import { GlobalStyles } from '@zopauk/react-components';
import { splitTransactions, netSpend } from './helpers';

const transactions = require('./data/transactions.json');

const App = () => {
  const [active, setActive] = useState(false);
  const [activeOverlay, setActiveOverlay] = useState(false);
  const [weeklyTransaction, setWeeklyTransactions] = useState([]);

  useEffect(() => {
    setWeeklyTransactions(splitTransactions(transactions));
    setActive(true);
  }, []);

  const toggleOverlay = () => {
    setActive(!active);
    setActiveOverlay(!activeOverlay);
  };

  return (
    <SMain>
      <GlobalStyles />
      <Header active={active} />
      <List>
        {weeklyTransaction.map((week, index) => {
          return (
            <ItemBar
              key={index}
              active={active}
              delay={1.3}
              data={netSpend(week)}
              xAxis={'26/09'}
              showOverlay={toggleOverlay}
            />
          );
        })}
      </List>
      <Overlay active={activeOverlay} hideOverlay={toggleOverlay} />
    </SMain>
  );
};

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const SMain = styled.main`
  position: relative;
  padding: 0 25px;
  @media (max-width: 690px) {
    width: 100%;
  }
`;

export default App;
