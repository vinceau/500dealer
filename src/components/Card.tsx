import React, { useState } from 'react';


interface CardProps {
  suit: string,
  rank: number
}

export const Card: React.SFC<CardProps> = (props) => {
  const [clicked, setClicked] = useState(false);
  const outerClasses = clicked ? "" : `${getSuit(props.suit)} rank${getRank(props.rank)}`;
  const innerClasses = clicked ? "back" : "face";
  return (
    <div onClick={() => setClicked(!clicked)} className={`card ${outerClasses}`}>
        <div className={innerClasses} />
    </div>
  );
}

const getRank = (value: number): number => {
    //joker is 0 but show 1 anyway
    if (value === 0 || value === 17) {
        return 1;
    }
    // else if (value > 10) {
    //     return value + 3;
    // }
    return value;
}

function getSuit(suit: string) {
  if (suit === 'S') {
      return 'spades';
  }
  else if (suit === 'C') {
      return 'clubs';
  }
  else if (suit === 'D') {
      return 'diamonds';
  }
  else if (suit === 'H') {
      return 'hearts';
  }
  return 'joker';
}

