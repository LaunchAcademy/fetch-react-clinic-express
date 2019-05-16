import React from 'react';

const BikeTile = props => {
  let model = props.bike.model
  let textArray = [props.bike.make, props.bike.year]
  let text = textArray.join(" - ")

  return(
    <li>
      <h3>{model}</h3>
      <p>{text}</p>
    </li>
  )
}

export default BikeTile;
