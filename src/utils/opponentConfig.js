import { forEachSquare, Position } from 'kokopu';

export const OPPONNENTS = [
	{
		name: 'Random Randy',
		code: `function calculateMove(position) => {
			const legalMoves = position.moves();
			return legalMoves[Math.floor(Math.random() * legalMoves.length)];
		}
		calculateMove
		`,
		calculateMove: (position) => {
			const legalMoves = position.moves();
			return legalMoves[Math.floor(Math.random() * legalMoves.length)];
		},
	},
	{
		name: 'Aggressive Alice',
		calculateMove: (position) => {
			const legalMoves = position.moves();
			const originalFen = position.fen();
			const positionCopy = new Position(position);
			for (let move of legalMoves) {
				positionCopy.play(move);
				if (positionCopy.isCheckmate() || positionCopy.isCheck()) {
					return move;
				}
				positionCopy.fen(originalFen);

				if (move.isCapture()) {
					return move;
				}
			}
			return legalMoves[Math.floor(Math.random() * legalMoves.length)];
		},
	},
	{
		name: 'Minne Max',
		calculateMove: (position) => {
			const legalMoves = position.moves();
			const fen = position.fen();

			const legalMoveMap = legalMoves.map((move) => {
				return {
					move: move,
					score: 0,
				};
			});
			let highestScoreMove = legalMoveMap[0];

			const calcProxyScore = () => {
				// need something here
			};

			const determineMoveScore = (move, depth, myTurn) => {
				position.fen(fen);
				position.play(move);

				if (position.isCheckmate()) {
					return 99;
				}
				if (depth === 0) {
					return calcProxyScore();
				}
				position.moves().forEach((move) => {
					if (myTurn) {
						return Math.max(
							calcProxyScore(),
							determineMoveScore(move, depth--, !myTurn),
						);
					} else {
						return Math.min(
							calcProxyScore(),
							determineMoveScore(move, depth--, !myTurn),
						);
					}
				});
			};

			legalMoveMap.forEach((move) => {
				move.score = determineMoveScore(move, 2, true);

				if (highestScoreMove.score === move.score) {
					highestScoreMove = Math.random() > 0.5 ? move : highestScoreMove;
				}
				highestScoreMove =
					move.score > highestScoreMove.score ? move : highestScoreMove;
			});

			return highestScoreMove.move;
		},
	},
];
