import React from 'react';
import BikeTile from './BikeTile'

const BikesIndex = props => {
  let bikes = props.bikes.map(bike => {
    return(
      <BikeTile
        key={bike.id}
        bike={bike}
      />
    )
  })
  return(
    <ul>
      {bikes}
    </ul>
  );
}

export default BikesIndex;
