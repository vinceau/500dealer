import React, { useState } from 'react';
import { FiveHundredGame, FiveHundredCard, FiveHundredCardCompare } from '../lib/fivehundred';
import { Card } from './Card';

interface GameProps {
    code: string;
    players: number;
}

export const Game: React.SFC<GameProps> = (props) => {
    const [player, setPlayer] = useState(0);
    const [kittyShown, setKittyShown] = useState(false);
    const [hand, setHand] = useState<FiveHundredCard[]>([]);


    const game = new FiveHundredGame(props.players, props.code);

    let options = [];
    for (let i=0; i < props.players; i++) {
        options.push(<option key={`optionPlayer${i+1}`} value={i+1}>Player {i+1}</option>);
    }
    const reset = () => {
        setHand([]);
        setKittyShown(false);
    }
    const handleChange = (event: React.FormEvent<HTMLSelectElement>) => {
        setPlayer(parseInt(event.currentTarget.value));
    }
    const deal = () => {
        if (player !== 0) {
            reset();
            setHand(game.deal(player).sort(FiveHundredCardCompare));
        }
    }
    const kitty = () => {
        if (!kittyShown) {
            setHand(hand.concat(game.kitty()));
            setKittyShown(true);
        }
    }
    return (
        <div>
            <div>
                <label htmlFor="player-option">I am:</label>
                <select value={player} onChange={handleChange}>
                    <option value={0} />
                    {options}
                </select>
                <button disabled={player === 0} onClick={deal}>🃋 Deal me the cards</button>
                <button disabled={player === 0 || kittyShown} onClick={kitty}>😻 meow</button>
            </div>
            <ul id="cards">{hand.map((card) => {
                return <Card key={card.repr()} rank={card.value} suit={card.suit} />
            })}</ul>
        </div>
    );
}
