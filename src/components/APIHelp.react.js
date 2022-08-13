import React, { useState } from 'react';
import { BsInfoCircle, BsArrowsAngleContract } from 'react-icons/bs';

const styles = {};
export default function APIHelp(props) {
	const [isExpanded, setExpanded] = useState(false);
	const toggleExpansion = () => {
		setExpanded(!isExpanded);
	};
	return isExpanded ? (
		<div>
			<BsArrowsAngleContract
				style={styles.helpCollapsed}
				onClick={toggleExpansion}
			/>
			go here
			<a href='https://kokopu.yo35.org/docs/2.9.2/Position.html#play'>
				https://kokopu.yo35.org/docs/2.9.2/Position.html#play
			</a>
		</div>
	) : (
		<BsInfoCircle onClick={toggleExpansion} />
	);
}
