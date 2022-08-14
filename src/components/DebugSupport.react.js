import APIHelp from './APIHelp.react';
import GameBoard from './GameBoard.react';
import {
	BsInfoCircle,
	BsFillPlayFill,
	BsFillArrowRightSquareFill,
	BsFillArrowDownRightCircleFill,
	BsFillArrowUpRightCircleFill,
	BsStopCircle,
} from 'react-icons/bs';
import { BiReset } from 'react-icons/bi';

import { OPPONNENTS } from '../utils/opponentConfig';
import { useContext, useMemo, useState } from 'react';
import CalcMoveFunctionContext from '../utils/CalcMoveFunctionContext';
import { forEachSquare } from 'kokopu';

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
	button: {
		height: 30,
		width: 30,
	},
	debugButtons: {
		marginRight: '8px',
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

	const playSigleMove = () => {
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
				<div style={styles.debugButtons}>
					<BsFillPlayFill style={styles.button} onClick={finishGame} />
					<BsFillArrowRightSquareFill
						style={styles.button}
						onClick={playMoveWithResponse}
					/>
					<BsFillArrowDownRightCircleFill
						style={styles.button}
						onClick={playSigleMove}
					/>
					<BsStopCircle style={styles.button} onClick={props.stopAutoPlay} />
					<BiReset style={styles.button} onClick={props.resetBoard} />
				</div>
				<div style={styles.flex}>
					<div>
						<label htmlFor='opponents'>Opposing AI:</label>
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
					<BsInfoCircle style={styles.button} />
				</div>
			</div>
		</div>
	);
}
