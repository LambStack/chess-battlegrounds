import { useMemo, useState } from 'react';
import {
	BsInfoCircle,
	BsFillPlayFill,
	BsFillArrowRightSquareFill,
	BsFillArrowDownRightCircleFill,
	BsStopCircle,
} from 'react-icons/bs';
import { BiReset } from 'react-icons/bi';
const styles = {
	tooltipVisible: {
		position: 'absolute',
	},
	tooltipHidden: {},
	button: {
		height: 30,
		width: 30,
		display: 'inline',
	},
};

export const icons = {
	info: () => {
		return <BsInfoCircle style={styles.button} />;
	},
	play: () => {
		return <BsFillPlayFill style={styles.button} />;
	},
	response: () => {
		return <BsFillArrowRightSquareFill style={styles.button} />;
	},
	step: () => {
		return <BsFillArrowDownRightCircleFill style={styles.button} />;
	},
	stop: () => {
		return <BsStopCircle style={styles.button} />;
	},
	reset: () => {
		return <BiReset style={styles.button} />;
	},
};

export default function DebuggerButton(props) {
	const { getIcon, tooltip, onClick } = props;

	const [isTooltipVisible, setTooltipVisible] = useState(false);

	return (
		<div
			style={styles.button}
			onMouseEnter={() => setTooltipVisible(true)}
			onMouseLeave={() => setTooltipVisible(false)}
			onClick={onClick}
		>
			{getIcon()}
			{isTooltipVisible && (
				<div
					style={
						isTooltipVisible ? styles.tooltipVisible : styles.tooltipHidden
					}
				>
					{tooltip}
				</div>
			)}
		</div>
	);
}
