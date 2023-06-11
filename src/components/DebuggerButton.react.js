import { useMemo, useState } from 'react';
import { BsInfoCircle, BsStopCircle } from 'react-icons/bs';
import { GrPowerReset, GrPlay, GrChapterNext } from 'react-icons/gr';
import { RxTrackNext } from 'react-icons/rx';
const styles = {
	tooltip: {
		position: 'absolute',
	},
	button: {
		paddingRight: '2px',
		display: 'inline-block',
		height: 30,
		width: 30,
	},
	hovered: {
		border: '2px solid black',
	},
};

export const icons = {
	info: () => {
		return <BsInfoCircle style={styles.button} />;
	},
	play: () => {
		return <GrPlay style={styles.button} />;
	},
	response: () => {
		return <GrChapterNext style={styles.button} />;
	},
	step: () => {
		return <RxTrackNext style={styles.button} />;
	},
	stop: () => {
		return <BsStopCircle style={styles.button} />;
	},
	reset: () => {
		return <GrPowerReset style={styles.button} />;
	},
};

export default function DebuggerButton(props) {
	const { getIcon, tooltip, onClick } = props;

	const [isHovered, setHovered] = useState(false);
	return (
		<>
			<div
				style={
					isHovered ? { ...styles.button, ...styles.hovered } : styles.button
				}
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
				onClick={onClick}
			>
				{getIcon()}
			</div>
			{isHovered && <div style={styles.tooltip}>{tooltip}</div>}
		</>
	);
}
