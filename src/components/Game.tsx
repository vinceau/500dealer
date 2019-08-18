import React, { useState } from 'react';
import { FiveHundredGame, FiveHundredCard, FiveHundredCardCompare } from '../lib/fivehundred';
import { Card } from './Card';

interface GameProps {
    code: string;
    players: number;
}

export const Game: React.SFC<GameProps> = (props) => {
    const [player, setPlayer] = useState(0);
    const [hand, setHand] = useState<FiveHundredCard[]>([]);


    const game = new FiveHundredGame(props.players, props.code);

    let options = [];
    for (let i=0; i < props.players; i++) {
        options.push(<option key={`optionPlayer${i+1}`} value={i+1}>Player {i+1}</option>);
    }
    const handleChange = (event: React.FormEvent<HTMLSelectElement>) => {
        setHand([]);
        setPlayer(parseInt(event.currentTarget.value));
    }
    const deal = (whichPlayer: number) => {
        if (whichPlayer !== 0) {
            setHand(game.deal(whichPlayer).sort(FiveHundredCardCompare));
        }
    }
    return (
        <div>
            <div>
                <label htmlFor="player-option">I am the player:</label>
                <select value={player} onChange={handleChange}>
                    <option value={0} />
                    {options}
                </select>
                <span>{player}</span>
                <button disabled={player === 0} onClick={() => {
                    deal(player);
                }}>🃋 Deal me the cards</button>
                <button disabled={player === 0}>😻 meow</button>
            </div>
            <ul id="cards">{hand.map((card) => {
                return <Card key={card.repr()} rank={card.value} suit={card.suit} />
            })}</ul>
        </div>
    );
}
