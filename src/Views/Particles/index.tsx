import React from 'react';
import Particle from './components/Particle';

const Particles = ({ particles, processRunning }: any) => {
  return (
    <>
      <div className='circle'>
        <div className='camera -x'>
          <div className='camera -y'>
            <div className='camera -z'>
              <div className='particles'>
                {!processRunning &&
                  particles &&
                  particles.map((x: any, index: any) => {
                    return (
                      <Particle
                        key={index}
                        category={`${x.transaction_category}`}
                      />
                    );
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
