import React  from 'react';

import { ACTION_TYPES } from "./App"

export default function OperationButton({dispatch, operation}) {
    return (
        <button 
            onClick={() => 
                dispatch({ type: ACTION_TYPES.ADD, payload: {operation} })}
        > 
         {operation} 
        </button>
    )   
}
