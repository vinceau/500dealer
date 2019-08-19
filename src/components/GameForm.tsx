import React, { useState } from 'react';
import useReactRouter from 'use-react-router';

import { Game } from './Game';

interface GameFormProps {
    code: string;
}

export const GameForm: React.SFC<GameFormProps> = (props) => {
    const { history } = useReactRouter();
    const [numPlayers, setNumPlayers] = useState(4);
    const handleChange = (event: React.FormEvent<HTMLSelectElement>) => {
        setNumPlayers(parseInt(event.currentTarget.value));
    }
    const newCode = () => {
        const randomCode = Math.random().toString(36).slice(2);
        history.push(`/game/${randomCode}`);
    }
    return (
        <div>
            <h1>500 cards dealer</h1>
            <div>
                <label htmlFor="player-option">No. Players:</label>
                <select value={numPlayers} onChange={handleChange}>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                </select>
            </div>
            <div>
                <label htmlFor="seed">The secret code for this round is:</label>
                <input id="seed" readOnly value={props.code} />
                <button onClick={newCode}>
                    <span aria-label="dice" role="img">🎲</span> New Code
                </button>
            </div>
            <Game code={props.code} players={numPlayers} />
        </div>
    );
}