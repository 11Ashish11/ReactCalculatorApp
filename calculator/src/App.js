import React, { Component } from 'react';
import { useReducer } from 'react';
import "./styles.css";

const ACTION_TYPES = {
  ADD: 'ADD',
  SUBTRACT: 'SUBTRACT',
  MULTIPLY: 'MULTIPLY',
  DIVIDE: 'DIVIDE',
  CLEAR: 'CLEAR',
  EVALUATE: 'EVALUATE',
}

function reducer(state, {type, payload} ) {
  switch(type) {
    case ACTION_TYPES.ADD:
      return {
        ...state,
        currentOperand: `${currentOperand}${payload.digit}`
}
  }
}


function App() {

  const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(reducer, {})
  dispatch({type: ACTION_TYPES.ADD, payload: {digit: '1'}})
  return (
    <div className="calculator-grid">
      <div className="output">
      <div className="previous-operand"> {previousOperand} {operation} </div>
      <div className="current-operand"> {currentOperand} </div>
      </div>
      <button className="span-two"> AC </button>
      <button> DEL </button>
      <button> ÷ </button>
      <button> 1 </button>
      <button> 2 </button>
      <button> 3 </button>
      <button> + </button>
      <button> 4 </button>
      <button> 5 </button>
      <button> 6 </button>
      <button> - </button>
      <button> 7 </button>
      <button> 8 </button>
      <button> 9 </button>
      <button> x </button>
      <button> 0 </button>
      <button> . </button>
      <button className="span-two"> = </button>
    </div>
  );
}

export default App;
