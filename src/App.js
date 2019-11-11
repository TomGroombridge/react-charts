import React from 'react';
import { GlobalStyles } from '@zopauk/react-components';
import styled from 'styled-components';
import TransactionalChart from './containers/TransactionalChart';
import TransactionParticles from './containers/TransactionParticles';
import AddBankAccount from './containers/AddBankAccount';
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
          {/* <Route exact path='/addBankAccount'>
            <AddBankAccount />
          </Route> */}
          <Route path='/addBankAccount' exact>
            <TransactionParticles />
          </Route>
        </Switch>
      </Router>
    </SMain>
  );
};

const SMain = styled.main`
  position: relative;
  padding: 25px 25px;
  @media (max-width: 690px) {
    width: 100%;
  }
`;

export default App;
