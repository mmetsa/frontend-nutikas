import React, { useState } from "react"
import '../../styles/MemoryCard.css';

interface MemoryCardProps {
	id: number;
	flipped: boolean;
	answered: boolean;
	icon: JSX.Element;
	text: string | null;
	handleCardClick: (id: number) => void;
}

const MemoryCard: React.FC<MemoryCardProps> = ({ answered: answered, id: id, flipped: flipped, icon, text: text, handleCardClick: handleCardClick }) => {
	
	const handleClick = () => {
		handleCardClick(id);
	};
	
	return (
		<>
			<div className={`MemoryCard ${flipped ? 'flipped' : ''} ${answered ? 'card-answered' : ''}`} onClick={handleClick}>
				<div className="memory-card-inner">
					<div className="memory-card-front">
						<div className="memory-card-content">
							{icon}
						</div>
					</div>
					<div className="memory-card-back">
						<div className="memory-card-content">
							{text ? text : ""}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default MemoryCard;
