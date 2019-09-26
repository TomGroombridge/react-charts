import React, { useEffect, useState } from 'react';
import ItemBar from './ItemBar';
import styled from 'styled-components';
// import Header from './Header';

const App = () => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(true);
  }, []);

  return (
    <SMain>
      {/* <Header active={active} /> */}
      <List>
        <ItemBar active={active} delay={0.1} data={260} xAxis={'26/09'} />
        <ItemBar active={active} delay={0.2} data={224} xAxis={'25/09'} />
        <ItemBar active={active} delay={0.3} data={200} xAxis={'24/09'} />
        <ItemBar active={active} delay={0.4} data={128} xAxis={'23/09'} />
        <ItemBar active={active} delay={0.5} data={152} xAxis={'22/09'} />
        <ItemBar active={active} delay={0.6} data={128.4} xAxis={'21/09'} />
        <ItemBar active={active} delay={0.7} data={204} xAxis={'20/09'} />
      </List>
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
