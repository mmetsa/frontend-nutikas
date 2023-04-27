import React, { useState } from "react"
import '../../styles/MemoryCard.css';

interface MemoryCardProps {
	icon: JSX.Element;
	text: string;
}

const MemoryCard: React.FC<MemoryCardProps> = ({ icon, text }) => {
	const [flipped, setFlipped] = useState(false);
	
	const handleClick = () => {
		setFlipped(!flipped);
	};
	
	return (
		<>
		{!flipped && (
			<div className={`MemoryCard ${flipped ? 'flipped' : ''}`} onClick={handleClick}>
				<div className="memory-card-inner">
					<div className="memory-card-front">
						<div className="memory-card-content">
							{icon}
						</div>
					</div>
					<div className="memory-card-back">
						<div className="memory-card-content">
							{text}
						</div>
					</div>
				</div>
			</div>
		)}
		</>
	);
};

export default MemoryCard;
