import React from 'react';

import useReactRouter from 'use-react-router';
import { Game } from './Game';

interface GameFormProps {
    code: string;
}

export const GameForm: React.SFC<GameFormProps> = (props) => {
    const { history } = useReactRouter();
    return (
        <div>
            <h1>500 cards dealer</h1>
            <div>
                <label htmlFor="seed">The secret code for this round is:</label>
                <input id="seed" readOnly value={props.code}/>
                <button onClick={() => {
                    const randomCode = Math.random().toString(36).slice(2);
                    history.push(`/game/${randomCode}`);
                }}>🎲 New Code</button>
            </div>
            <Game players={4} code={props.code}/>
        </div>
    );
}
