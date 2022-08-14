import React, { useState } from 'react';
import './App.css';
import Home from './pages/Home.react';
import CalcMoveFunctionContext from './utils/CalcMoveFunctionContext';
const styles = {
	app: {
		minHeight: '100vh',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
	nav: {
		height: 60,
		backgroundColor: '#333',
	},
	footer: {
		height: 60,
		backgroundColor: '#666',
	},
	page: {
		flex: 1,
	},
};

function App() {
	const [calcMoveFunction, setCalcMoveFunction] = useState(`position => {
			const legalMoves = position.moves();
			return legalMoves[Math.floor(Math.random() * legalMoves.length)];
		  }`);

	return (
		<div style={styles.app}>
			<div style={styles.nav}></div>
			<CalcMoveFunctionContext.Provider value={calcMoveFunction}>
				<div style={styles.page}>
					<Home setCalcMoveFunction={setCalcMoveFunction} />
				</div>
			</CalcMoveFunctionContext.Provider>

			<div style={styles.footer}></div>
		</div>
	);
}

export default App;
