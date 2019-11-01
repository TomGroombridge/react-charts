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
  const [highestValue, setHighestValue] = useState();
  const [activeWeek, setActiveWeek] = useState();
  useEffect(() => {
    setWeeklyTransactions(splitTransactions(transactions));

    setActive(true);
  }, []);

  const toggleOverlay = week => {
    setActiveWeek(week);
    setActive(!active);
    setActiveOverlay(!activeOverlay);
  };

  const setValue = transactions => {
    const value = Math.max.apply(
      Math,
      transactions.map(week => {
        return netSpend(week);
      })
    );
    return value;
  };

  useEffect(() => {
    if (weeklyTransaction.length > 0) {
      const x = setValue(weeklyTransaction);
      setHighestValue(x);
    }
  }, [weeklyTransaction]);

  return (
    <SMain>
      <GlobalStyles />
      <Header active={active} />
      <List>
        {highestValue &&
          weeklyTransaction.map((week, index) => {
            return (
              <ItemBar
                key={index}
                active={active}
                delay={1.3}
                data={netSpend(week)}
                weeksData={week}
                xAxis={`${netSpend(week)}`}
                showOverlay={toggleOverlay}
                height={netSpend(week) * (300 / highestValue)}
              />
            );
          })}
      </List>
      <Overlay
        active={activeOverlay}
        hideOverlay={toggleOverlay}
        activeWeek={activeWeek}
      />
    </SMain>
  );
};

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  height: 100px;
`;

const SMain = styled.main`
  position: relative;
  padding: 0 25px;
  @media (max-width: 690px) {
    width: 100%;
  }
`;

export default App;
