import { forEachSquare } from 'kokopu';

export const OPPONNENTS = [
	{
		name: 'Random Randy',
		code: `function calculateMove(position) => {
			const legalMoves = position.moves();
			return legalMoves[Math.floor(Math.random() * legalMoves.length)];
		}
		`,
		calculateMove: (position) => {
			const legalMoves = position.moves().sort(() => {
				return Math.random() - 0.5;
			});
			return legalMoves[0];
		},
	},
	{
		name: 'Aggressive Alice',
		calculateMove: (position) => {
			const legalMoves = position.moves().sort(() => {
				return Math.random() - 0.5;
			});
			const originalFen = position.fen();

			for (let move of legalMoves) {
				position.play(move);
				if (position.isCheckmate() || position.isCheck()) {
					return move;
				}
				position.fen(originalFen);

				if (move.isCapture()) {
					return move;
				}
			}
			return legalMoves[0];
		},
	},
	{
		name: 'Minnie Max',
		calculateMove: (position) => {
			const legalMoves = position.moves().sort(() => {
				return Math.random() - 0.5;
			});
			const fen = position.fen();

			const legalMoveMap = legalMoves.map((move) => {
				return {
					originalMove: move, // this is what we'll play at the end
					continuation: move, // the move in this line we're currently estimating
					score: 0,
				};
			});
			let highestScoreMove = legalMoveMap[0];

			const determineMoveScore = (move, depth, wasMyTurn) => {
				position.fen(fen);
				// afteer this it becomes the opponents turn, we will be estimating positions during their turn
				position.play(move.continuation != null ? move.continuation : move);

				function calcProxyScore() {
					// need something here
					const trimmedFen = position.fen().replace(/[^a-z]/gi, '');
					let whitePieces = 0,
						blackPieces = 0;
					forEachSquare((square) => {
						if (position.square(square)[0] === 'w') {
							whitePieces++;
						} else if (position.square(square)[0] === 'b') {
							blackPieces++;
						}
					});
					if (
						// it's my turn and I'm white
						(position.turn() === 'b' && wasMyTurn) ||
						// it's not my turn and I'm white
						(position.turn() === 'w' && !wasMyTurn)
					) {
						return whitePieces - blackPieces;
					} else {
						return blackPieces - whitePieces;
					}
				}
				if (position.isCheckmate() && wasMyTurn) {
					return 99;
				} else if (position.isCheckmate() && !wasMyTurn) {
					return -99;
				}
				if (depth <= 0) {
					const proxyScore = calcProxyScore();
					return proxyScore;
				}
				const moves = position.moves();
				for (let i = 0; i < moves.length; i++) {
					const prxyScore = calcProxyScore();
					const responseScore = determineMoveScore(
						moves[i],
						depth - 1,
						!wasMyTurn,
					);
					if (wasMyTurn) {
						const max = Math.max(prxyScore, responseScore);
						return max;
					} else {
						const min = Math.min(prxyScore, responseScore);
						return min;
					}
				}
			};

			legalMoveMap.forEach((move) => {
				move.score = determineMoveScore(move, 10, true);
				highestScoreMove =
					move.score > highestScoreMove.score ? move : highestScoreMove;
			});

			// reset position
			position.fen(fen);
			return highestScoreMove.originalMove;
		},
	},
];
