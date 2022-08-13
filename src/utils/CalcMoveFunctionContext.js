import React from 'react';
const CalcMoveFunctionContext = React.createContext(`function calculateMove(
	position,
) {
	return position.moves()[Math.floor(Math.random() * position.moves().length)];
}`);

export default CalcMoveFunctionContext;
