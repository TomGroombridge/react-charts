import React from "react";
import { GlobalStyles } from "@zopauk/react-components";
import styled from "styled-components";
import TransactionalChart from "./containers/TransactionalChart";
import TransactionParticles from "./containers/TransactionParticles";
import AddBankAccount from "./containers/AddBankAccount";
import { Router, Switch, Route } from "react-router-dom";
import history from "./history";

const App = () => {
  return (
    <SMain>
      <GlobalStyles />
      <Router history={history}>
        <Switch>
          <Route exact path="/">
            <TransactionalChart />
          </Route>
          <Route path="/transactions" exact>
            <TransactionParticles />
          </Route>
          <Route path="/addBankAccount" exact>
            <AddBankAccount />
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
