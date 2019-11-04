import React, { useState } from 'react';
import Particles from '../../Views/Particles';
import transactions from '../../data/transactions.json';

const TransactionParticles = () => {
  const [particles, setParticles] = useState(transactions.results);

  return <Particles particles={particles} />;
};

export default TransactionParticles;
