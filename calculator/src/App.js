import React from 'react';
import { useReducer } from 'react';
import "./styles.css";
import DigitFunction from './DigitFunction';
import OperationButton from './OperationButton';

export const ACTION_TYPES = {
  ADD: 'ADD',
  SUBTRACT: 'SUBTRACT',
  MULTIPLY: 'MULTIPLY',
  DIVIDE: 'DIVIDE',
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: 'CLEAR',
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
      if(state.currentOperand === "" && state.previousOperand === "") {
        return state;
      }
      if(state.previousOperand === null) {
        return {
          ...state,
          previousOperand: state.currentOperand,
          currentOperand: "",
          operation: payload.operation
        }
      }
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null
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
      return prev + curr;
    case "-":
      return prev - curr;
    case "*":
      return prev * curr;
    case "÷":
      return prev / curr;
  }
}


function App() {

  const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(reducer, {})
  // dispatch({type: ACTION_TYPES.ADD, payload: {digit: 1 }})

  return (
    <div className="calculator-grid">
      <div className="output">
      <div className="previous-operand"> {previousOperand} {operation} </div>
      <div className="current-operand"> {currentOperand} </div>
      </div>
      <button className="span-two"
        onClick={() => dispatch({type: ACTION_TYPES.CLEAR })} > AC </button>
      <OperationButton operation={ACTION_TYPES.CLEAR} operation="DEL" />
      <OperationButton operation={ACTION_TYPES.DIVIDE} operation="÷" />
  
      <DigitFunction digit= "1" dispatch={dispatch} />
      <DigitFunction digit= "2" dispatch={dispatch} />
      <DigitFunction digit= "3" dispatch={dispatch} />
      
      <OperationButton operation={ACTION_TYPES.MULTIPLY} operation="x" />

      <DigitFunction digit= "4" dispatch={dispatch} />
      <DigitFunction digit= "5" dispatch={dispatch} />
      <DigitFunction digit= "6" dispatch={dispatch} />
      
      <OperationButton operation={ACTION_TYPES.SUBTRACT} operation="-" />

      <DigitFunction digit= "7" dispatch={dispatch} />
      <DigitFunction digit= "8" dispatch={dispatch} />
      <DigitFunction digit= "9" dispatch={dispatch} />
      
      <OperationButton operation={ACTION_TYPES.ADD} operation="+" />

      <DigitFunction digit= "." dispatch={dispatch} />
      <DigitFunction digit= "0" dispatch={dispatch} />
      <button className="span-two"> = </button>

    </div>
  );
}

export default App;
