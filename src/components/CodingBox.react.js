import React, { useContext } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; //Example style, you can use another
import CalcMoveFunctionContext from '../utils/CalcMoveFunctionContext';
import { OPPONNENTS } from '../utils/opponentConfig';

const styles = {
	container: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		border: '2px solid #333',
	},
	editor: {
		fontSize: 14,
		backgroundColor: '#F5F2EF',
		height: '100%',
	},
	header: {
		alignSelf: 'start',
		backgroundColor: '#666',
		border: '2px solid #333',
		height: 50,
		width: '100%',
	},
};
export default function CodingBox(props) {
	const calcMoveFunction = useContext(CalcMoveFunctionContext);

	const [code, setCode] = React.useState(calcMoveFunction);
	const [opponent, setOpponent] = React.useState(OPPONNENTS[0]);

	return (
		<div style={styles.container}>
			<div style={styles.header}>
				{
					<div>
						<label htmlFor='opponents'>Your AI:</label>
						<select
							name='opponents'
							id='opponents'
							onChange={(e) => {
								setOpponent(OPPONNENTS[e.target.value]);
								setCode(OPPONNENTS[e.target.value].calculateMove.toString());
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
				}
			</div>
			<Editor
				value={code}
				onValueChange={(code) => {
					setCode(code);
					props.setCalcMoveFunction(code);
				}}
				highlight={(code) => highlight(code, languages.js)}
				padding={10}
				style={styles.editor}
			/>
		</div>
	);
}
