import React from 'react';

import { Chessboard } from 'kokopu-react';

export default function GameBoard(props) {
	return <Chessboard position={props.position.fen()} squareSize={50} />;
}
