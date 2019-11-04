import React, { useState } from 'react';
import Particles from '../../Views/Particles';

const TransactionParticles = () => {
  const [particles, setParticles] = useState([1, 2, 3]);

  const handleClick = () => {
    setParticles([...particles, 1]);
  };

  return <Particles handleClick={handleClick} particles={particles} />;
};

export default TransactionParticles;
