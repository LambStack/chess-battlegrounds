import GameBoard from './GameBoard.react';

import { OPPONNENTS } from '../utils/opponentConfig';
import { useContext, useMemo, useState } from 'react';
import CalcMoveFunctionContext from '../utils/CalcMoveFunctionContext';
import { forEachSquare } from 'kokopu';
import DebuggerButton, { icons } from './DebuggerButton.react';

const styles = {
	container: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		border: '2px solid brown',
		alignItems: 'end',
		justifyContent: 'space-between',
	},
	flex: {
		display: 'flex',
	},
};

// const getCalcMoveFunction = () => {
// 	return eval(`${code}\ncalculateMove`);
// };
// const testCode = () => {
// 	console.log(code);
// 	const move = getCalcMoveFunction()(position);
// 	props.playMove(move);
// };

export default function DebugSupport(props) {
	const calcMoveFunction = useContext(CalcMoveFunctionContext);
	const [opponent, setOpponent] = useState(OPPONNENTS[0]);
	const getCalcMoveFunctionAsFn = useMemo(() => {
		return () => {
			return eval(calcMoveFunction);
		};
	}, [calcMoveFunction]);

	const playSingleMove = () => {
		const move = getCalcMoveFunctionAsFn()(props.position, forEachSquare);
		props.playMove(move);
	};
	const playMoveWithResponse = () => {
		const move = getCalcMoveFunctionAsFn()(props.position, forEachSquare);
		props.playMoveWithResponse(move, opponent.calculateMove);
	};

	const finishGame = () => {
		props.playUntilGameEnds(getCalcMoveFunctionAsFn(), opponent.calculateMove);
	};

	return (
		<div>
			<GameBoard position={props.position} />
			<div style={styles.container}>
				<div>
					<DebuggerButton
						onClick={finishGame}
						tooltip={'Play moves'}
						getIcon={icons.play}
					/>
					<DebuggerButton
						onClick={playMoveWithResponse}
						tooltip={'Play move, with response'}
						getIcon={icons.response}
					/>

					<DebuggerButton
						onClick={playSingleMove}
						tooltip={'Play single move, (Input AI plays both sides)'}
						getIcon={icons.step}
					/>
					<DebuggerButton
						onClick={props.stopAutoPlay}
						tooltip={'Stop playing'}
						getIcon={icons.stop}
					/>
					<DebuggerButton
						onClick={props.resetBoard}
						tooltip={'Reset game'}
						getIcon={icons.reset}
					/>
				</div>
				<div style={styles.flex}>
					<div>
						<label htmlFor='opponents'>Black AI:</label>
						<select
							name='opponents'
							id='opponents'
							onChange={(e) => {
								setOpponent(OPPONNENTS[e.target.value]);
							}}
						>
							{OPPONNENTS.map((opponent, index) => {
								return (
									<option key={opponent.name} value={index}>
										{opponent.name}
									</option>
								);
							})}
						</select>
					</div>
					<DebuggerButton
						tooltip={'API Support (button does nothing right now)'}
						getIcon={icons.info}
					/>
				</div>
			</div>
			<div>
				<h1>API</h1>
				<ul>
					<li>
						<b>Position: </b>
						<a href='https://kokopu.yo35.org/docs/2.9.2/Position.html'>
							https://kokopu.yo35.org/docs/2.9.2/Position.html
						</a>
						{/* <ul>
							<li>
								fen(): get the Forsyth–Edwards Notation of the current position
							</li>
							<li>
								fen(fen): set the current position to the state described by the
								argument
							</li>
						</ul> */}
					</li>
					<li>
						<b>forEachSquare: </b>
						<a href='https://kokopu.yo35.org/docs/2.9.2/global.html#forEachSquare'>
							https://kokopu.yo35.org/docs/2.9.2/global.html#forEachSquare
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
}
