import React, { useState } from 'react';

import { Game } from './Game';

interface GameFormProps {
    code: string;
}

export const GameForm: React.SFC<GameFormProps> = (props) => {
    const [numPlayers, setNumPlayers] = useState(4);
    const handleChange = (event: React.FormEvent<HTMLSelectElement>) => {
        setNumPlayers(parseInt(event.currentTarget.value));
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
            <Game code={props.code} players={numPlayers} />
        </div>
    );
}