import React, { useState } from 'react';

import useReactRouter from 'use-react-router';
import { FiveHundredGame, FiveHundredCard, FiveHundredCardCompare } from '../lib/fivehundred';
import { Card } from './Card';

interface GameProps {
    code: string;
    players: number;
}

export const Game: React.SFC<GameProps> = (props) => {
    const { history } = useReactRouter();
    const [player, setPlayer] = useState(0);
    const [kittyShown, setKittyShown] = useState(false);
    const [hand, setHand] = useState<FiveHundredCard[]>([]);
    const reset = () => {
        setHand([]);
        setKittyShown(false);
    }

    const game = new FiveHundredGame(props.players, props.code);

    let options = [];
    for (let i=0; i < props.players; i++) {
        options.push(<option key={`optionPlayer${i+1}`} value={i+1}>Player {i+1}</option>);
    }
    const handleChange = (event: React.FormEvent<HTMLSelectElement>) => {
        reset();
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
    const newCode = () => {
        reset();
        const randomCode = Math.random().toString(36).slice(2);
        history.push(`/game/${randomCode}`);
    }
    return (
        <div>
            <div>
                <label htmlFor="seed">The secret code for this round is:</label>
                <input id="seed" readOnly value={props.code}/>
                <button onClick={newCode}>
                    <span aria-label="dice" role="img">🎲</span> New Code
                </button>
            </div>
            <div>
                <div>
                    <label htmlFor="player-option">I am:</label>
                    <select value={player} onChange={handleChange}>
                        <option value={0} />
                        {options}
                    </select>
                    <button disabled={player === 0} onClick={deal}>🃋 Deal me the cards</button>
                    <button disabled={player === 0 || kittyShown} onClick={kitty}>
                        <span aria-label="cat" role="img">😻</span> meow
                    </button>
                </div>
                <ul id="cards">{hand.map((card) => {
                    return <Card key={card.repr()} rank={card.value} suit={card.suit} />
                })}</ul>
            </div>
        </div>
    );
}