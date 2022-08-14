import React from 'react';
const CalcMoveFunctionContext = React.createContext(`position => {
    const legalMoves = position.moves();
    return legalMoves[Math.floor(Math.random() * legalMoves.length)];
  }`);

export default CalcMoveFunctionContext;
