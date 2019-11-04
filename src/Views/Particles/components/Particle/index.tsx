import React from 'react';
import '../../index.scss';

const Particle = () => {
  return (
    <div className='particle'>
      <div className='rotate'>
        <div className='part'>
          <div className='rotatefollow'>
            <div className='camerafollow -z'>
              <div className='camerafollow -y'>
                <div className='camerafollow -x'>
                  <div className='graphic'></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Particle;
