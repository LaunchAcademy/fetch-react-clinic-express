import React from 'react';

const BikeTile = props => {
  let model = props.bike.model
  let textArray = [props.bike.make, props.bike.year, model]
  let text = textArray.join(" - ")

  return(
    <li>{text}</li>
  )
}

export default BikeTile;
