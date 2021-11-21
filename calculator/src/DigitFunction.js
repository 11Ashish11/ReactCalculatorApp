import React  from 'react';

import { ACTION_TYPES } from "./App"

export default function DigitFunction({dispatch, digit}) {
    return (
        <button 
            onClick={() => dispatch({ type: ACTION_TYPES.ADD, payload: {digit} })}
        > 
         {digit} 
        </button>
    )   
}
