import React from 'react';
import './dogCard.css';

const dogCard = props => (
  <div className="imgContainer">
    <div onClick={() => props.selectDog(props.dogName)} className={'imgStyle'}>
      <img className="imgPos" alt={props.dogName} src={props.image} />
    </div>
  </div>
);

export default dogCard;
