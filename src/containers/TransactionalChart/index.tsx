import React, { useEffect, useState } from 'react';
import ItemBar from '../../ItemBar';
import styled from 'styled-components';
import Overlay from '../../Overlay';
import Header from '../../Header';
import { splitTransactions, netSpend } from '../../helpers/';
import transactions from '../../data/transactions.json';

const TransactionalChart = () => {
  const [active, setActive] = useState(false);
  const [activeOverlay, setActiveOverlay] = useState(false);
  const [weeklyTransaction, setWeeklyTransactions] = useState([]);
  const [highestValue, setHighestValue] = useState();
  const [activeWeek, setActiveWeek] = useState();

  useEffect(() => {
    setWeeklyTransactions(splitTransactions(transactions) as any);
    setActive(true);
  }, []);

  const toggleOverlay = (week: any) => {
    setActiveWeek(week);
    setActive(!active);
    setActiveOverlay(!activeOverlay);
  };

  const setValue = (transactions: any) => {
    const value = Math.max.apply(
      Math,
      transactions.map((week: any) => {
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
    <>
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
    </>
  );
};

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  height: 100px;
`;

export default TransactionalChart;
