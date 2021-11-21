import React from 'react';
import { useReducer } from 'react';
import "./styles.css";
import DigitFunction from './DigitFunction';
import OperationButton from './OperationButton';

export const ACTION_TYPES = {
  ADD: 'ADD',
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: 'CLEAR',
  DELETE: 'delete',
  EVALUATE: 'EVALUATE',
}

function reducer(state, {type, payload} ) {
  switch(type) {
    case ACTION_TYPES.ADD:
      if(payload.digit === "0" && state.currentOperand === "0") {
        return state;
      }
      if(payload.digit === ".") {
        if(state.currentOperand.includes(".")) {
          return state;
        }
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || '' }${payload.digit}`
      }

    case ACTION_TYPES.CHOOSE_OPERATION :
      if(state.currentOperand == null && state.previousOperand == null) {
        return state;
      }

      if( state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        }
      }

      if(state.previousOperand == null) {
        return {
          ...state,
          previousOperand: state.currentOperand,
          currentOperand: null,
          operation: payload.operation
        }
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      }

    case ACTION_TYPES.DELETE:
      if(state.currentOperand == null) {
        return state;
      }
      if(state.currentOperand.length === 1) {
        return {
          ...state,
          currentOperand: null
        }
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1)
      }

    case ACTION_TYPES.CLEAR : 
      return {}

    
    case ACTION_TYPES.EVALUATE :
      if(state.operation == null || state.previousOperand == null || state.currentOperand == null) {
        return state;
      }


      return {
        ...state,
        previousOperand: null,
        currentOperand: evaluate(state),
        operation: null,
      }
  }
}


function evaluate( {currentOperand, previousOperand, operation} ) {
  const prev = parseFloat(previousOperand);
  const curr = parseFloat(currentOperand);
  if(isNaN(prev) || isNaN(curr)) {
    return "";
  }
  switch(operation) {
    case "+" :
      return (prev + curr).toString();
    case "-":
      return (prev - curr).toString();
    case "x":
      return (prev * curr).toString();
    case "÷":
      return (prev / curr).toString();
  }
}


function App() {

  const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(reducer, {})
  return (
    <div className="calculator-grid">
      <div className="output">
      <div className="previous-operand"> {previousOperand} {operation} </div>
      <div className="current-operand"> {currentOperand} </div>
      </div>
      <button className="span-two"
        onClick={() => dispatch({type: ACTION_TYPES.CLEAR })} > AC </button>
      <button onClick={() => dispatch({type: ACTION_TYPES.DELETE})}>
        DEL
      </button>
      <OperationButton dispatch={dispatch} operation="÷" />
  
      <DigitFunction digit= "1" dispatch={dispatch} />
      <DigitFunction digit= "2" dispatch={dispatch} />
      <DigitFunction digit= "3" dispatch={dispatch} />
      
      <OperationButton dispatch={dispatch} operation="x" />

      <DigitFunction digit= "4" dispatch={dispatch} />
      <DigitFunction digit= "5" dispatch={dispatch} />
      <DigitFunction digit= "6" dispatch={dispatch} />
      
      <OperationButton dispatch={dispatch} operation="-" />

      <DigitFunction digit= "7" dispatch={dispatch} />
      <DigitFunction digit= "8" dispatch={dispatch} />
      <DigitFunction digit= "9" dispatch={dispatch} />
      
      <OperationButton dispatch={dispatch} operation="+" />

      <DigitFunction digit= "." dispatch={dispatch} />
      <DigitFunction digit= "0" dispatch={dispatch} />
      <button className="span-two" onClick={() => dispatch({type: ACTION_TYPES.EVALUATE})}> = </button>

    </div>
  );
}

export default App;
