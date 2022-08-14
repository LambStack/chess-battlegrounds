import { Position, forEachSquare } from 'kokopu';
import React, { useRef, useState } from 'react';
import CodingBox from '../components/CodingBox.react';
import DebugSupport from '../components/DebugSupport.react';

const styles = {
	container: {
		display: 'flex',
		flex: 1,
	},
	debugArea: {
		borderRight: '1px solid black',
	},
};

export default function Home(props) {
	const position = new Position();
	const finishGameIntervalId = useRef(0);
	const [gameState, setGameState] = useState(position);

	const playMoveOnPosition = (move, position) => {
		const notation = position.notation(move);
		const played = position.play(notation);
		return played;
	};

	const playMove = (move) => {
		const tempPosition = new Position(gameState.fen());
		playMoveOnPosition(move, tempPosition);
		setGameState(tempPosition);
	};

	const playMoveWithResponse = (move, response) => {
		const tempPosition = new Position(gameState);
		playMoveOnPosition(move, tempPosition);
		const responseMove = response(tempPosition, forEachSquare);
		playMoveOnPosition(responseMove, tempPosition);
		setGameState(tempPosition);
	};

	const playUntilGameEnds = (player1Function, player2Function) => {
		let tempPosition = new Position(gameState);

		const intervalId = setInterval(() => {
			const newTempPositon = new Position(tempPosition);
			if (newTempPositon.hasMove()) {
				playMoveOnPosition(
					player1Function(newTempPositon, forEachSquare),
					newTempPositon,
				);
			}
			if (newTempPositon.hasMove()) {
				playMoveOnPosition(
					player2Function(newTempPositon, forEachSquare),
					newTempPositon,
				);
			}
			tempPosition = new Position(newTempPositon);
			setGameState(tempPosition);
		}, 250);
		finishGameIntervalId.current = intervalId;
	};

	const stopAutoPlay = () => {
		clearInterval(finishGameIntervalId.current);
	};
	const resetBoard = () => {
		stopAutoPlay();
		setGameState(new Position());
	};
	return (
		<div style={styles.container}>
			<DebugSupport
				style={styles.debugArea}
				position={gameState}
				playMove={playMove}
				playMoveWithResponse={playMoveWithResponse}
				playUntilGameEnds={playUntilGameEnds}
				stopAutoPlay={stopAutoPlay}
				resetBoard={resetBoard}
			/>
			<CodingBox setCalcMoveFunction={props.setCalcMoveFunction} />
		</div>
	);
}
