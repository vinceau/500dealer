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
    // show 1 for joker and ace
    switch (value) {
        case 0: // joker rank
            return 1;
        case 17: // ace rank
            return 1;
        default:
            return value;
    }
}

function getSuit(suit: string) {
    switch (suit) {
        case 'S':
            return 'spades';
        case 'C':
            return 'clubs';
        case 'D':
            return 'diamonds';
        case 'H':
            return 'hearts';
        default:
            return 'joker';
    }
}
