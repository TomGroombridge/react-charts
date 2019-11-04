import React from 'react';
import Particle from './components/Particle';
import { Button } from '@zopauk/react-components';

const Particles = ({ handleClick, particles }: any) => {
  return (
    <>
      <Button onClick={() => handleClick()}>Add Particle</Button>
      <div className='circle'>
        <div className='camera -x'>
          <div className='camera -y'>
            <div className='camera -z'>
              <div className='particles'>
                {particles &&
                  particles.map((x: any, index: any) => {
                    return <Particle key={index} />;
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Particles;
