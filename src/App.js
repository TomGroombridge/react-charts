import React from 'react';
import { GlobalStyles } from '@zopauk/react-components';
import styled from 'styled-components';
import TransactionalChart from './containers/TransactionalChart';
import TransactionParticles from './containers/TransactionParticles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
  return (
    <SMain>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route exact path='/'>
            <TransactionalChart />
          </Route>
          <Route path='/particles' exact>
            <TransactionParticles />
          </Route>
        </Switch>
      </Router>
    </SMain>
  );
};

const SMain = styled.main`
  position: relative;
  padding: 0 25px;
  @media (max-width: 690px) {
    width: 100%;
  }
`;

export default App;
