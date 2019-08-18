import React, { useState } from 'react';


interface CardProps {
  suit: string,
  rank: number
}

export const Card: React.SFC<CardProps> = (props) => {
  const [clicked, setClicked] = useState(false);
  const outerClasses = clicked ? "" : `${props.suit} rank${getRank(props.rank)}`;
  const innerClasses = clicked ? "back" : "face";
  return (
    <div onClick={() => setClicked(!clicked)} className={`card ${outerClasses}`}>
        <div className={innerClasses} />
    </div>
  );
}

const getRank = (value: number): number => {
    //joker is 0 but show 1 anyway
    if (value === 0 || value === 14) {
        return 1;
    }
    else if (value > 10) {
        return value + 3;
    }
    return value;
}

