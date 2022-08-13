import { Position } from 'kokopu';

export function OpponentsDropdown(props) {
	return (
		<div>
			<label htmlFor='opponents'>Opposing AI:</label>
			<select
				name='opponents'
				id='opponents'
				onChange={(e) => {
					props.setOpponent(OPPONNENTS[e.target.value]);
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
	);
}

export const OPPONNENTS = [
	{
		name: 'Random Randy',
		calculateMove: (position) => {
			const legalMoves = position.moves();
			return legalMoves[Math.floor(Math.random() * legalMoves.length)];
		},
	},
	{
		name: 'Aggressive Alice',
		calculateMove: (position) => {
			const legalMoves = position.moves();
			const fen = position.fen();
			const positionCopy = new Position(position);
			for (let move of legalMoves) {
				positionCopy.play(move);
				if (positionCopy.isCheckmate() || positionCopy.isCheck()) {
					return move;
				}
				positionCopy.fen(fen);

				if (move.isCapture()) {
					return move;
				}
			}
			return legalMoves[Math.floor(Math.random() * legalMoves.length)];
		},
	},
];
